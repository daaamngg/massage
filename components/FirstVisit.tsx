import { Clock3, Utensils, MessageSquare } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const steps = [
  {
    icon: Clock3,
    title: "Приходите за 5–10 минут",
    text: "Успеете спокойно переодеться и настроиться — без спешки.",
  },
  {
    icon: Utensils,
    title: "Не ешьте плотно перед сеансом",
    text: "Лучше за час-полтора до визита. Лёгкий перекус — можно.",
  },
  {
    icon: MessageSquare,
    title: "Расскажите, что беспокоит",
    text: "Мастер уточнит самочувствие и противопоказания и подберёт программу под вас.",
  },
];

export default function FirstVisit() {
  return (
    <section id="first-visit" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            center
            overline="Первый визит"
            title="Если вы у нас впервые"
            subtitle="Всё просто — вот что стоит знать перед первым сеансом."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.06} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-surface/40 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold">
                    <Icon size={19} />
                  </span>
                  <h3 className="mt-4 font-serif text-lg leading-snug text-cream">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-dim">
                    {s.text}
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
