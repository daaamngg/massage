import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = {
  name: 80,
  phone: 30,
  datetime: 120,
  comment: 800,
  service: 200,
  services: 40,
};

function splitIds(v: string | undefined) {
  return (v || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function sendTelegram(token: string, chatId: string, text: string) {
  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });
    if (!tg.ok) {
      console.error(
        `Telegram sendMessage failed for ${chatId}:`,
        tg.status,
        await tg.text()
      );
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Telegram request threw for ${chatId}:`, err);
    return false;
  }
}

// Сообщение от имени сообщества ВК. Получатель должен один раз написать
// сообществу или разрешить ему сообщения — иначе ВК не даст отправить.
async function sendVk(token: string, userId: string, text: string) {
  try {
    const res = await fetch("https://api.vk.com/method/messages.send", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        user_id: userId,
        random_id: String(Math.floor(Math.random() * 2_147_483_647)),
        message: text,
        dont_parse_links: "1",
        access_token: token,
        v: "5.199",
      }),
    });
    // ВК отвечает 200 даже на ошибку — смотреть надо поле error.
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || data.error) {
      console.error(
        `VK messages.send failed for ${userId}:`,
        res.status,
        data?.error?.error_msg
      );
      return false;
    }
    return true;
  } catch (err) {
    console.error(`VK request threw for ${userId}:`, err);
    return false;
  }
}

// Lightweight per-IP rate limit (per server instance).
const hits = new Map<string, number[]>();
function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 6;
}

// Trim, replace control characters with spaces, cap length. Rejects non-strings.
function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  let out = "";
  for (const ch of v) {
    const code = ch.codePointAt(0) ?? 0;
    out += code < 0x20 || code === 0x7f ? " " : ch;
  }
  return out.trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный запрос" },
      { status: 400 }
    );
  }

  // Honeypot — a hidden field only bots fill in. Pretend success, send nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip =
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Слишком много заявок. Попробуйте позже." },
      { status: 429 }
    );
  }

  const name = clean(body.name, MAX.name);
  const phone = clean(body.phone, MAX.phone);
  const datetime = clean(body.datetime, MAX.datetime);
  const comment = clean(body.comment, MAX.comment);
  const services = Array.isArray(body.services)
    ? body.services
        .filter((s): s is string => typeof s === "string")
        .slice(0, MAX.services)
        .map((s) => clean(s, MAX.service))
        .filter(Boolean)
    : [];

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Укажите имя и телефон" },
      { status: 400 }
    );
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { ok: false, error: "Проверьте номер телефона" },
      { status: 400 }
    );
  }
  const lines = [
    "🆕 Новая заявка с сайта",
    "",
    `👤 Имя: ${name}`,
    `📞 Телефон: ${phone}`,
  ];
  // Master is picked in its own section — surface it separately.
  const masterPick = services.find((s) => s.startsWith("Мастер: "));
  const chosenServices = services.filter((s) => !s.startsWith("Мастер: "));

  if (masterPick) lines.push("", `✨ ${masterPick}`);
  if (chosenServices.length) {
    lines.push("", "💆 Выбранные услуги:");
    for (const s of chosenServices) lines.push(`   • ${s}`);
  }
  if (datetime) lines.push("", `🕐 Желаемое время: ${datetime}`);
  if (comment) lines.push("", `💬 Комментарий: ${comment}`);

  const text = lines.join("\n");

  // Каналы доставки: Telegram и/или сообщения от сообщества ВК.
  // Получателей можно несколько через запятую — каждый получит то же самое.
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChats = splitIds(process.env.TELEGRAM_CHAT_ID);
  const vkToken = process.env.VK_GROUP_TOKEN;
  const vkUsers = splitIds(process.env.VK_NOTIFY_USER_IDS);

  const jobs: Promise<boolean>[] = [];
  if (tgToken) for (const id of tgChats) jobs.push(sendTelegram(tgToken, id, text));
  if (vkToken) for (const id of vkUsers) jobs.push(sendVk(vkToken, id, text));

  if (jobs.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Сервис записи временно недоступен" },
      { status: 500 }
    );
  }

  try {
    // Заявка принята, если дошла хотя бы до одного получателя: один
    // недоступный чат (например, не нажали «Старт») не должен её потерять.
    const results = await Promise.all(jobs);

    if (!results.some(Boolean)) {
      return NextResponse.json(
        { ok: false, error: "Не удалось отправить заявку. Позвоните нам." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Booking route error:", e);
    return NextResponse.json(
      { ok: false, error: "Ошибка сервера. Попробуйте позвонить." },
      { status: 500 }
    );
  }
}
