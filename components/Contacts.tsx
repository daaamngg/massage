import {
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  ExternalLink,
  Send,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

// Реальная карточка организации в Яндекс.Картах (oid из ссылки на салон).
const orgUrl =
  "https://yandex.ru/maps/org/masterskaya_massazha_i_kosmetologii/42775550453/";
const mapSrc =
  "https://yandex.ru/map-widget/v1/?mode=search&oid=42775550453&ol=biz&z=16";

export default function Contacts() {
  return (
    <section id="contacts" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            overline="Контакты"
            title="Как нас найти"
            subtitle="Две студии в Самаре. Работаем по предварительной записи."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Main studio with map */}
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface/40">
              <div className="aspect-[16/10] w-full bg-surface-2">
                <iframe
                  src={mapSrc}
                  title="Карта — ул. Дыбенко, 95"
                  loading="lazy"
                  className="h-full w-full border-0 grayscale-[0.2]"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gold">Основная студия</p>
                <p className="mt-1 flex items-center gap-2 text-cream">
                  <MapPin size={16} className="flex-shrink-0 text-gold" />
                  ул. Дыбенко, 95 · Самара
                </p>
                <a
                  href={orgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-text-dim transition-colors hover:text-gold"
                >
                  Открыть в Яндекс.Картах <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Second studio (private — district only) + contact block */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-6 sm:p-8">
              <p className="text-sm text-gold">Вторая студия</p>
              <p className="mt-1 flex items-center gap-2 text-cream">
                <MapPin size={16} className="flex-shrink-0 text-gold" />
                мкр-н Южный город, ул. Челышевская
              </p>
              <p className="mt-2 text-sm text-text-dim">
                Точный адрес сообщаем при записи.
              </p>

              <div className="mt-auto space-y-4 border-t border-border pt-6">
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-center gap-3 text-cream transition-colors hover:text-gold"
                >
                  <Phone size={17} className="text-gold" /> {site.phone}
                </a>
                <p className="flex items-start gap-3 text-text">
                  <Clock size={17} className="mt-0.5 flex-shrink-0 text-gold" />
                  <span>
                    {site.workingHours}
                    <br />
                    <span className="text-sm text-text-dim">
                      {site.responseHours}
                    </span>
                  </span>
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={site.vkWrite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-5 py-2 text-sm"
                  >
                    <MessageCircle size={15} /> Написать в ВК
                  </a>
                  {site.max && (
                    <a
                      href={site.max}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline px-5 py-2 text-sm"
                    >
                      <Send size={15} /> Написать в MAX
                    </a>
                  )}
                  <a
                    href={site.telegramChannel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-5 py-2 text-sm"
                  >
                    Telegram-канал
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
