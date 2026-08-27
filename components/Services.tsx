import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ServiceRow } from "./ServiceRow";
import { serviceCategories } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            overline="Услуги и цены"
            title="Более 30 программ для тела и лица"
            subtitle="Классический и лечебный массаж, авторские техники, СПА-ритуалы, уход за лицом и программы для двоих."
          />
          <p className="mt-5 flex items-center gap-2 text-sm text-text-dim">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gold/50 text-base leading-none text-gold">
              +
            </span>
            Отмечайте услуги плюсом — они попадут в вашу заявку.
          </p>
        </Reveal>

        <div className="mt-12 space-y-8">
          {serviceCategories.map((cat) => (
            <Reveal key={cat.id}>
              <div className="rounded-2xl border border-border bg-surface/40 p-4 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-4">
                  <h3 className="font-serif text-2xl text-cream sm:text-3xl">
                    {cat.title}
                  </h3>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-gold sm:text-xs">
                    {cat.caption}
                  </span>
                </div>
                <ul className="mt-2 grid gap-x-10 sm:grid-cols-2">
                  {cat.items.map((it) => (
                    <ServiceRow key={it.name} item={it} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-text-dim">
              Не нашли нужную программу? Напишите — подберём под вашу задачу.
            </p>
            <a href="#booking" className="btn-gold px-8 py-3 text-base">
              Перейти к заявке
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
