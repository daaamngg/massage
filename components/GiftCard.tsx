"use client";

import { Plus, Check } from "lucide-react";
import { useSelection } from "./SelectionContext";

export function GiftCard({
  title,
  amount,
  value,
}: {
  title: string;
  amount: string;
  value: string;
}) {
  const { has, toggle } = useSelection();
  const active = has(value);

  return (
    <button
      type="button"
      onClick={() => toggle(value)}
      aria-pressed={active}
      className={`group flex flex-col items-start rounded-2xl border p-5 text-left transition-all ${
        active
          ? "border-gold bg-gold/10"
          : "border-border bg-surface/40 hover:border-gold/40"
      }`}
    >
      <span className="text-sm text-text-dim">{title}</span>
      <span className="text-gradient-gold mt-1 font-serif text-2xl">
        {amount}
      </span>
      <span
        className={`mt-4 flex items-center gap-1.5 text-xs transition-colors ${
          active ? "text-gold" : "text-text-dim group-hover:text-gold"
        }`}
      >
        {active ? (
          <>
            <Check size={14} /> В заявке
          </>
        ) : (
          <>
            <Plus size={14} /> В заявку
          </>
        )}
      </span>
    </button>
  );
}
