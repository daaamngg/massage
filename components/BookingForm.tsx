"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { X, Phone, MessageCircle, Send } from "lucide-react";
import { CheckMark, MorphSubmit, type MorphPhase } from "./MorphSubmit";
import { useSelection } from "./SelectionContext";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

const inputCls =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-cream placeholder:text-text-dim outline-none transition-colors focus:border-gold";

export default function BookingForm() {
  const { selected, remove, clear } = useSelection();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [datetime, setDatetime] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  // Согласие на обработку ПД: галочка по умолчанию снята — так требует закон.
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  // Карточка «принято» появляется не сразу: сначала кнопка дорисовывает
  // галочку, иначе морф просто не успевают увидеть.
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (status !== "ok") return;
    const t = setTimeout(() => {
      clear();
      setShowCard(true);
    }, 1100);
    return () => clearTimeout(t);
  }, [status, clear]);

  // Цель в Метрике: сколько людей выбирает ВК вместо формы.
  function onVkClick() {
    const ym = (window as unknown as { ym?: (...args: unknown[]) => void }).ym;
    ym?.(Number(site.metrikaId), "reachGoal", "vk_write");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          services: selected,
          datetime,
          comment,
          website,
          consent,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok)
        throw new Error(data.error || "Не удалось отправить заявку");
      setStatus("ok");
      setConsent(false); // каждая заявка — своё согласие
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Не удалось отправить заявку");
    }
  }

  return (
    <section id="booking" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            center
            overline="Запись"
            title="Оставьте заявку"
            subtitle="Заполните форму в любое время — мы свяжемся и подтвердим удобное время."
          />
        </Reveal>

        <Reveal delay={0.1}>
          {showCard ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 rounded-2xl border border-gold/30 bg-surface/50 p-10 text-center"
            >
              {/* Тот же кружок, что был кнопкой: layoutId переносит его сюда */}
              <motion.span
                layoutId="booking-check"
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
                className="badge-gold mx-auto flex h-14 w-14"
              >
                <CheckMark />
              </motion.span>
              <h3 className="mt-4 font-serif text-2xl text-cream">
                Заявка принята!
              </h3>
              <p className="mt-3 text-text">
                Спасибо! Мы свяжемся с вами в ближайшее время, чтобы подтвердить
                запись.
              </p>
              <button
                onClick={() => {
                  setShowCard(false);
                  setStatus("idle");
                }}
                className="btn-outline mt-6 px-6 py-2.5"
              >
                Отправить ещё одну
              </button>
            </motion.div>
          ) : (
            <div>
            {/* Кто пишет в ВК сам — приходит сразу с профилем, и чат открыт
                в обе стороны. Наталья консультирует именно там. */}
            <a
              href={site.vkWrite}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onVkClick}
              className="mt-10 flex flex-col gap-4 rounded-2xl border border-gold/30 bg-surface/50 p-5 transition-colors hover:border-gold sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <span className="flex items-start gap-3">
                <MessageCircle size={22} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  <span className="block font-serif text-lg text-cream">
                    Удобнее во ВКонтакте?
                  </span>
                  <span className="mt-0.5 block text-sm text-text-dim">
                    Напишите Наталье — ответит прямо там.
                  </span>
                </span>
              </span>
              <span className="btn-outline shrink-0 px-5 py-2 text-sm">
                Написать в ВК
              </span>
            </a>

            <p className="mt-6 flex items-center gap-3 text-xs uppercase tracking-widest text-text-dim">
              <span className="h-px flex-1 bg-border" />
              или оставьте заявку
              <span className="h-px flex-1 bg-border" />
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-6 rounded-2xl border border-border bg-surface/40 p-6 sm:p-8"
            >
              {/* Honeypot — hidden from users, catches bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              {selected.length > 0 ? (
                <div className="mb-6">
                  <p className="mb-2 text-sm text-text-dim">Выбранные услуги:</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.map((s) => (
                      <span
                        key={s}
                        className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 py-1 pl-3 pr-2 text-sm text-cream"
                      >
                        {s}
                        <button
                          type="button"
                          onClick={() => remove(s)}
                          aria-label={`Убрать ${s}`}
                          className="text-text-dim transition-colors hover:text-gold"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mb-6 text-sm text-text-dim">
                  Отметьте нужное в разделах{" "}
                  <a
                    href="#services"
                    className="text-gold underline-offset-2 hover:underline"
                  >
                    «Услуги»
                  </a>
                  ,{" "}
                  <a
                    href="#masters"
                    className="text-gold underline-offset-2 hover:underline"
                  >
                    «Мастера»
                  </a>{" "}
                  и{" "}
                  <a
                    href="#gift"
                    className="text-gold underline-offset-2 hover:underline"
                  >
                    «Сертификаты»
                  </a>{" "}
                  — или просто опишите пожелание в комментарии.
                </p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className={inputCls}
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  required
                />
                <input
                  className={inputCls}
                  type="tel"
                  placeholder="Телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={30}
                  required
                />
              </div>
              <input
                className={`${inputCls} mt-4`}
                placeholder="Удобные дата и время (необязательно)"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                maxLength={120}
              />
              <textarea
                className={`${inputCls} mt-4 resize-none`}
                rows={3}
                placeholder="Комментарий (необязательно)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={800}
              />
              <p className="mt-2 text-xs text-text-dim">
                Пожалуйста, не пишите здесь о здоровье — мастер обсудит это
                с вами лично.
              </p>

              <div className="mt-5 flex items-start gap-3">
                <input
                  id="booking-consent"
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-gold"
                />
                <div className="text-sm leading-snug">
                  <label
                    htmlFor="booking-consent"
                    className="cursor-pointer text-text"
                  >
                    Даю согласие на обработку персональных данных
                  </label>
                  <p className="mt-1 text-xs text-text-dim">
                    <Link
                      href="/consent"
                      target="_blank"
                      className="text-gold underline-offset-2 hover:underline"
                    >
                      Текст согласия
                    </Link>
                    {" · "}
                    <Link
                      href="/privacy"
                      target="_blank"
                      className="text-gold underline-offset-2 hover:underline"
                    >
                      Политика обработки данных
                    </Link>
                  </p>
                </div>
              </div>

              {status === "error" && (
                <p className="mt-4 text-sm text-red-400">{error}</p>
              )}

              <MorphSubmit
                className="mt-6"
                phase={
                  (status === "loading"
                    ? "loading"
                    : status === "ok"
                      ? "ok"
                      : "idle") satisfies MorphPhase
                }
                label="Отправить заявку"
                morphId="booking-check"
              />

              <p className="mt-4 text-center text-xs text-text-dim">
                {site.responseHours}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-border pt-6 text-sm">
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-center gap-2 text-cream transition-colors hover:text-gold"
                >
                  <Phone size={15} className="text-gold" /> {site.phone}
                </a>
                <a
                  href={site.vkWrite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cream transition-colors hover:text-gold"
                >
                  <MessageCircle size={15} className="text-gold" /> Написать в ВК
                </a>
                {site.max && (
                  <a
                    href={site.max}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-cream transition-colors hover:text-gold"
                  >
                    <Send size={15} className="text-gold" /> Написать в MAX
                  </a>
                )}
              </div>
            </form>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
