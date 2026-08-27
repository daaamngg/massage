import { site, nav } from "@/lib/site";
import { VkIcon, TelegramIcon, MaxIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="font-serif text-lg text-cream">Наталья Хасаншина</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-text-dim">
              мастерская массажа и косметологии · Самара
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-text-dim transition-colors hover:text-gold"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-sm">
            <a
              href={`tel:${site.phoneHref}`}
              className="text-cream transition-colors hover:text-gold"
            >
              {site.phone}
            </a>
            <div className="flex items-center gap-2">
              <a
                href={site.vkCommunity}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ВКонтакте"
                title="ВКонтакте"
                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border text-text-dim transition-colors hover:border-gold/50 hover:text-gold active:bg-gold/15"
              >
                <VkIcon size={19} />
              </a>
              <a
                href={site.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                title="Telegram"
                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border text-text-dim transition-colors hover:border-gold/50 hover:text-gold active:bg-gold/15"
              >
                <TelegramIcon size={18} />
              </a>
              {site.max && (
                <a
                  href={site.max}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MAX"
                  title="MAX"
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border text-text-dim transition-colors hover:border-gold/50 hover:text-gold active:bg-gold/15"
                >
                  <MaxIcon size={19} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6 text-center text-xs text-text-dim">
          © {year} Мастерская массажа и косметологии Натальи Хасаншиной.
          Работаем с 2011 года.
        </div>
      </div>
    </footer>
  );
}
