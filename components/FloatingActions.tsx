"use client";

import { Phone, MessageCircle, Send } from "lucide-react";
import { site } from "@/lib/site";

const goldBg =
  "linear-gradient(135deg, rgba(228,201,131,0.98), rgba(201,162,75,0.98))";

function Action({
  href,
  label,
  children,
  gold = false,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  gold?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("tel:") ? undefined : "_blank"}
      rel={href.startsWith("tel:") ? undefined : "noopener noreferrer"}
      aria-label={label}
      className="group flex items-center justify-end gap-2.5"
    >
      <span
        className={`pointer-events-none hidden translate-x-2 whitespace-nowrap rounded-full px-4 py-2 text-sm opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block ${
          gold
            ? "font-semibold text-[#1a120a]"
            : "border border-border bg-surface/95 text-cream backdrop-blur"
        }`}
        style={gold ? { background: goldBg } : undefined}
      >
        {label}
      </span>
      <span
        className={`flex h-13 w-13 flex-shrink-0 items-center justify-center rounded-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-105 ${
          gold
            ? "text-[#1a120a]"
            : "border border-gold/40 bg-surface/90 text-gold backdrop-blur"
        }`}
        style={{
          width: "3.25rem",
          height: "3.25rem",
          ...(gold ? { background: goldBg } : {}),
        }}
      >
        {children}
      </span>
    </a>
  );
}

export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {site.max && (
        <Action href={site.max} label="Написать в MAX">
          <Send size={20} />
        </Action>
      )}
      <Action href={site.vkWrite} label="Написать в ВК">
        <MessageCircle size={21} />
      </Action>
      <Action href={`tel:${site.phoneHref}`} label={site.phone} gold>
        <Phone size={20} />
      </Action>
    </div>
  );
}
