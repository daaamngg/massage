import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { MasterCard } from "./MasterCard";
import { masters } from "@/lib/site";

export default function Masters() {
  return (
    <section id="masters" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            overline="Наша команда"
            title="Мастера, которым доверяют"
            subtitle="Каждый — со своей специализацией и авторскими техниками. Вы в надёжных руках."
          />
          <p className="mt-5 flex items-center gap-2 text-sm text-text-dim">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gold/50 text-base leading-none text-gold">
              +
            </span>
            Можно выбрать мастера — он попадёт в вашу заявку.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {masters.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.06} className="h-full">
              <MasterCard master={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
