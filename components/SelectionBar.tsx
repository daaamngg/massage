"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSelection } from "./SelectionContext";

export function SelectionBar() {
  const { selected } = useSelection();

  return (
    <AnimatePresence>
      {selected.length > 0 && (
        <motion.a
          href="#booking"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-gold/40 bg-surface/95 py-2 pl-5 pr-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur sm:bottom-6"
        >
          <span className="whitespace-nowrap text-sm text-cream">
            Выбрано: <b className="text-gold">{selected.length}</b>
          </span>
          <span className="btn-gold px-4 py-1.5 text-xs">Оформить</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
