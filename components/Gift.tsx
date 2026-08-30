import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { GiftCard } from "./GiftCard";

const gifts = [
  { title: "Сертификат", amount: "2 500 ₽", value: "Подарочный сертификат — 2 500 ₽" },
  { title: "Сертификат", amount: "3 000 ₽", value: "Подарочный сертификат — 3 000 ₽" },
  { title: "Сертификат", amount: "5 000 ₽", value: "Подарочный сертификат — 5 000 ₽" },
  { title: "Номинал", amount: "на выбор", value: "Подарочный сертификат (номинал на выбор)" },
];

export default function Gift() {
  return (
    <section id="gift" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              overline="Подарочные сертификаты"
              title="Подарок, который запоминается"
            />
            <p className="mt-6 leading-relaxed text-text">
              Сертификат на любую услугу или сумму — тёплый подарок близким на
              любой повод. Выберите номинал и добавьте его в заявку — мы свяжемся
              и оформим красиво.
            </p>
            <p className="mt-3 text-sm text-text-dim">
              Действует на все услуги мастерской.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {gifts.map((g) => (
                <GiftCard key={g.value} {...g} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
