"use client";

import { useState, type FormEvent } from "react";
import {
  X,
  Loader2,
  CheckCircle2,
  Phone,
  MessageCircle,
  Send,
} from "lucide-react";
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
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

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
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok)
        throw new Error(data.error || "Не удалось отправить заявку");
      setStatus("ok");
      clear();
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
          {status === "ok" ? (
            <div className="mt-10 rounded-2xl border border-gold/30 bg-surface/50 p-10 text-center">
              <CheckCircle2 className="mx-auto text-gold" size={44} />
              <h3 className="mt-4 font-serif text-2xl text-cream">
                Заявка принята!
              </h3>
              <p className="mt-3 text-text">
                Спасибо! Мы свяжемся с вами в ближайшее время, чтобы подтвердить
                запись.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="btn-outline mt-6 px-6 py-2.5"
              >
                Отправить ещё одну
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-10 rounded-2xl border border-border bg-surface/40 p-6 sm:p-8"
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

              {status === "error" && (
                <p className="mt-4 text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-gold mt-6 w-full py-3.5 text-base disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Отправляем…
                  </>
                ) : (
                  "Отправить заявку"
                )}
              </button>

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
          )}
        </Reveal>
      </div>
    </section>
  );
}
