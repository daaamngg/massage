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

  const token = process.env.TELEGRAM_BOT_TOKEN;
  // Supports several recipients: "123456,789012" — each gets the same message.
  const chatIds = (process.env.TELEGRAM_CHAT_ID || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!token || chatIds.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Сервис записи временно недоступен" },
      { status: 500 }
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

  try {
    // Deliver to every recipient; the request succeeds if at least one lands,
    // so a single unreachable chat (e.g. someone never pressed Start) can't
    // silently lose the lead.
    const results = await Promise.all(
      chatIds.map(async (id) => {
        try {
          const tg = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: id,
                text,
                disable_web_page_preview: true,
              }),
            }
          );
          if (!tg.ok) {
            console.error(
              `Telegram sendMessage failed for ${id}:`,
              tg.status,
              await tg.text()
            );
            return false;
          }
          return true;
        } catch (err) {
          console.error(`Telegram request threw for ${id}:`, err);
          return false;
        }
      })
    );

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
