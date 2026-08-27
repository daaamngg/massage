"use client";

import { Plus, Check } from "lucide-react";
import { useSelection } from "./SelectionContext";
import type { ServiceItem } from "@/lib/site";

export function ServiceRow({ item }: { item: ServiceItem }) {
  const { has, toggle } = useSelection();
  const active = has(item.name);

  return (
    <li className="border-b border-border/40 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] leading-snug text-text sm:text-base">
            {item.name}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm">
            <span className="font-medium text-gold">
              {item.price.toLocaleString("ru-RU")} ₽
            </span>
            {item.duration && (
              <span className="text-text-dim">· {item.duration}</span>
            )}
            {item.note && (
              <span className="text-xs text-text-dim">{item.note}</span>
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={() => toggle(item.name)}
          aria-pressed={active}
          aria-label={
            active
              ? `Убрать «${item.name}» из заявки`
              : `Добавить «${item.name}» в заявку`
          }
          className={`-mr-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
            active
              ? "border-gold bg-gold text-[#1a120a]"
              : "border-border-strong text-gold active:bg-gold/20 sm:hover:border-gold sm:hover:bg-gold/10"
          }`}
        >
          {active ? <Check size={17} /> : <Plus size={17} />}
        </button>
      </div>
    </li>
  );
}
