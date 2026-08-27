"use client";

import { Check, UserPlus } from "lucide-react";
import { useSelection, MASTER_PREFIX } from "./SelectionContext";
import type { Master } from "@/lib/site";

export function MasterCard({ master }: { master: Master }) {
  const { has, toggleExclusive } = useSelection();
  const value = `${MASTER_PREFIX}${master.name}`;
  const active = has(value);

  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-6 transition-colors sm:p-7 ${
        active
          ? "border-gold bg-gold/10"
          : master.featured
            ? "border-gold/40 bg-surface/60"
            : "border-border bg-surface/40 hover:border-gold/30"
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-gold/40 font-serif text-2xl text-gold">
          {master.name[0]}
        </span>
        <div className="min-w-0">
          <h3 className="font-serif text-xl text-cream">{master.name}</h3>
          <p className="text-sm text-gold">{master.role}</p>
        </div>
      </div>

      {master.experience && (
        <p className="mt-5 inline-block self-start rounded-full border border-border px-3 py-1 text-xs text-text-dim">
          Опыт: {master.experience}
        </p>
      )}

      <p className="mt-4 text-sm leading-relaxed text-text-dim">
        {master.specialization}
      </p>

      <button
        type="button"
        onClick={() => toggleExclusive(value, MASTER_PREFIX)}
        aria-pressed={active}
        aria-label={
          active
            ? `Убрать мастера ${master.name} из заявки`
            : `Записаться к мастеру ${master.name}`
        }
        className={`mt-6 flex min-h-11 w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all ${
          active
            ? "border-gold bg-gold font-semibold text-[#1a120a]"
            : "border-border-strong text-gold active:bg-gold/20 sm:hover:border-gold sm:hover:bg-gold/10"
        }`}
      >
        {active ? (
          <>
            <Check size={16} /> Выбран
          </>
        ) : (
          <>
            <UserPlus size={16} /> Записаться к мастеру
          </>
        )}
      </button>
    </div>
  );
}
