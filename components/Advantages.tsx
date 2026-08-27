import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import {
  Sparkles,
  HandHeart,
  ShieldCheck,
  Leaf,
  Clock,
  MapPin,
} from "lucide-react";
import { site } from "@/lib/site";

const items = [
  {
    icon: Sparkles,
    title: "Авторские методики",
    text: "Программы и техники, которых не найти в сетевых салонах — мастера подбирают их под вашу задачу.",
  },
  {
    icon: HandHeart,
    title: "Опытные руки",
    text: "Мастера чувствуют тело, находят зажимы и работают на результат, а не поверхностно.",
  },
  {
    icon: ShieldCheck,
    title: "Приватность",
    text: "Тихо, спокойно и только по записи — сеанс полностью посвящён вам.",
  },
  {
    icon: Leaf,
    title: "Забота о теле",
    text: "Внимательный подход к каждому состоянию и противопоказаниям, натуральные средства.",
  },
  {
    icon: Clock,
    title: `${site.years} лет практики`,
    text: "Нам доверяют с 2011 года — возвращаются годами и приводят близких.",
  },
  {
    icon: MapPin,
    title: "Две студии",
    text: "Удобно добраться — на Дыбенко и в Южном городе.",
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            overline="Почему нас выбирают"
            title="Дорого не в цене, а в отношении"
            center
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-surface/40 p-7 transition-colors hover:border-gold/40">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-cream">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-dim">
                    {it.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
