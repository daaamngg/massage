"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { site, nav } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold/40 font-serif text-lg font-medium text-gold">
              НХ
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-base text-cream sm:text-lg">
                Наталья Хасаншина
              </span>
              <span className="text-[9px] uppercase tracking-[0.14em] text-text-dim sm:tracking-[0.18em]">
                мастерская массажа и косметологии
              </span>
            </span>
          </a>

          {/* Nav */}
          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-text transition-colors hover:text-gold"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={`tel:${site.phoneHref}`}
              className="flex items-center gap-2 text-sm text-cream transition-colors hover:text-gold"
            >
              <Phone size={15} className="text-gold" />
              {site.phone}
            </a>
            <a href="#booking" className="btn-gold">
              Записаться
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex-shrink-0 text-cream lg:hidden"
            aria-label="Открыть меню"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border bg-bg/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-4 px-5 py-6">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-text transition-colors hover:text-gold"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={`tel:${site.phoneHref}`}
                className="flex items-center gap-2 text-cream"
              >
                <Phone size={16} className="text-gold" />
                {site.phone}
              </a>
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="btn-gold"
              >
                Записаться
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
