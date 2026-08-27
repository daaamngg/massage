import { CalendarDays, Users, Star, MapPin } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

const stats = [
  {
    icon: CalendarDays,
    value: String(site.years),
    suffix: "лет",
    label: "в профессии, с 2011 года",
  },
  {
    icon: Users,
    value: "6",
    suffix: "мастеров",
    label: "каждый со своей специализацией",
  },
  {
    icon: Star,
    value: site.rating,
    suffix: "рейтинг",
    label: "по отзывам гостей",
  },
  {
    icon: MapPin,
    value: "2",
    suffix: "студии",
    label: "в Самаре, работаем по записи",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* Blur bridge anchored exactly to the hero/About boundary — half in each
          section, fading out at both ends so it adds no edge of its own.
          Lives here (not in Hero) so it paints above the hero and blurs it. */}
      <div className="seam-blur pointer-events-none absolute inset-x-0 top-0 h-[26vh] -translate-y-1/2 backdrop-blur-2xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              overline="О мастерской"
              title="Место, где о вас заботятся"
            />
            <div className="mt-6 space-y-4 leading-relaxed text-text">
              <p>
                С 2011 года мы помогаем телу восстановиться, а голове —
                отдохнуть. За эти годы к нам возвращаются семьями: за
                результатом, вниманием и атмосферой, в которой хочется остаться
                подольше.
              </p>
              <p>
                В основе — авторские методики Натальи Хасаншиной и команда
                мастеров, которые чувствуют тело, находят проблемные зоны и
                работают на результат, а не «просто гладят».
              </p>
              <p>
                Тихо, приватно и по предварительной записи — чтобы каждый сеанс
                был только про вас.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface/30">
              <div className="grid grid-cols-2">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.suffix}
                      className={`p-6 sm:p-8 ${
                        i % 2 === 0 ? "border-r border-border" : ""
                      } ${i < 2 ? "border-b border-border" : ""}`}
                    >
                      <Icon size={17} className="text-gold/70" />
                      <div className="mt-4 flex items-baseline gap-1.5">
                        <span className="text-gradient-gold text-4xl font-semibold tracking-tight [font-variant-numeric:tabular-nums] sm:text-5xl">
                          {s.value}
                        </span>
                        <span className="text-sm text-gold/80">{s.suffix}</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-text-dim sm:text-sm">
                        {s.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
