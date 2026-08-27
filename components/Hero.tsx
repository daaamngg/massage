import { Star, MapPin } from "lucide-react";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center">
      {/* Optional background photo — plain CSS background: no JS, no parallax,
          no fixed attachment, so it stays smooth on phones. */}
      {site.heroImage && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={
            {
              "--hero-img": `url(${site.heroImage})`,
              ...(site.heroImageMobile
                ? { "--hero-img-mobile": `url(${site.heroImageMobile})` }
                : {}),
            } as React.CSSProperties
          }
        >
          <div className="hero-photo absolute inset-0" />

          {/* Readability + blend into the dark theme */}
          <div className="absolute inset-0 bg-bg/75" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--bg) 0%, rgba(26,18,10,0.75) 45%, rgba(26,18,10,0.35) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[62vh]"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(26,18,10,0.55) 45%, rgba(26,18,10,0.9) 78%, var(--bg) 100%)",
            }}
          />
        </div>
      )}

      {/* Ambient gold glow (top) + grain */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 left-1/2 h-[65vh] w-[85vw] -translate-x-1/2 rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, rgba(201,162,75,0.20), transparent)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(243,234,219,0.6) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        />
      </div>

      {/* Bridge glow — bleeds past the section edge into "About" so the two
          sections share light instead of meeting at a hard line. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-32vh] mx-auto h-[64vh] w-[92vw] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(211,172,87,0.16), transparent)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8">
        <div className="max-w-3xl">
          {/* Overline */}
          <div className="reveal flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold sm:text-xs">
            <span className="h-px w-8 bg-gold/50" />
            <span>Самара</span>
            <span className="h-1 w-1 rounded-full bg-gold/70" />
            <span>с 2011 года</span>
          </div>

          {/* Headline */}
          <h1
            className="reveal mt-6 font-serif text-[2.5rem] leading-[1.14] text-cream sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.08s" }}
          >
            Прикосновение,
            <br />
            <span className="text-gradient-gold inline-block pb-[0.14em] pr-[0.08em] italic">
              которое возвращает лёгкость
            </span>
          </h1>

          <p
            className="reveal mt-6 max-w-xl text-base leading-relaxed text-text sm:text-lg"
            style={{ animationDelay: "0.16s" }}
          >
            Авторские методики, опытные руки и атмосфера, в которой уходит
            напряжение, а мысли затихают. Мастерская массажа и косметологии
            Натальи Хасаншиной.
          </p>

          <div
            className="reveal mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
            style={{ animationDelay: "0.24s" }}
          >
            <a href="#booking" className="btn-gold px-8 py-3 text-base">
              Записаться
            </a>
            <a href="#services" className="btn-outline px-8 py-3 text-base">
              Услуги и цены
            </a>
          </div>

          <div
            className="reveal mt-11 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-dim sm:gap-x-8"
            style={{ animationDelay: "0.32s" }}
          >
            <span className="flex items-center gap-1.5">
              <Star size={15} className="fill-gold text-gold" />
              Рейтинг {site.rating}
            </span>
            <span className="hidden h-4 w-px bg-border-strong sm:block" />
            <span>{site.years} лет практики</span>
            <span className="hidden h-4 w-px bg-border-strong sm:block" />
            <span>6 мастеров</span>
            <span className="hidden h-4 w-px bg-border-strong sm:block" />
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="text-gold" />
              Две студии в Самаре
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
