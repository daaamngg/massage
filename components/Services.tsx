import { ChevronDown } from "lucide-react";
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
            title="Более 30 программ массажа в Самаре"
            subtitle="Классический и лечебный массаж, авторские техники, СПА-ритуалы, уход за лицом и программы для двоих — в двух студиях Самары."
          />
          <p className="mt-5 flex items-center gap-2 text-sm text-text-dim">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-gold/50 text-base leading-none text-gold">
              +
            </span>
            Отмечайте услуги плюсом — они попадут в вашу заявку.
          </p>
        </Reveal>

        <div className="mt-12 space-y-4">
          {serviceCategories.map((cat, i) => {
            const from = Math.min(...cat.items.map((it) => it.price));
            return (
              <Reveal key={cat.id}>
                <details
                  open={i === 0}
                  className="group rounded-2xl border border-border bg-surface/40 px-4 transition-colors open:border-gold/30 sm:px-8"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                    <div className="min-w-0">
                      <h3 className="font-serif text-2xl text-cream sm:text-3xl">
                        {cat.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-dim">
                        {cat.items.length}{" "}
                        {cat.items.length === 1
                          ? "услуга"
                          : cat.items.length < 5
                            ? "услуги"
                            : "услуг"}{" "}
                        · от{" "}
                        <span className="text-gold">
                          {from.toLocaleString("ru-RU")} ₽
                        </span>
                      </p>
                    </div>
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border-strong text-gold transition-transform duration-300 group-open:rotate-180">
                      <ChevronDown size={18} />
                    </span>
                  </summary>

                  <ul className="grid gap-x-10 border-t border-border pt-2 pb-4 sm:grid-cols-2">
                    {cat.items.map((it) => (
                      <ServiceRow key={it.name} item={it} />
                    ))}
                  </ul>
                </details>
              </Reveal>
            );
          })}
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
