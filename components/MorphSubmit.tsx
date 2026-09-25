"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Кнопка отправки, которая не подменяется, а перетекает:
 * пилюля с текстом → круг со спиннером → галочка.
 * Элемент один и тот же, меняются только ширина и содержимое.
 * Содержимое меняется через блюр и по очереди — иначе текст и иконка
 * накладываются друг на друга посреди морфа.
 */

export type MorphPhase = "idle" | "loading" | "ok";

const SIZE = 56; // высота кнопки и диаметр круга
const spring = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.9 };
const swap = { duration: 0.16, ease: [0.4, 0, 0.2, 1] as const };

const enter = { opacity: 1, filter: "blur(0px)" };
const gone = { opacity: 0, filter: "blur(6px)" };

export function MorphSubmit({
  phase,
  label,
  className = "",
  morphId,
}: {
  phase: MorphPhase;
  label: string;
  className?: string;
  /** Общий id с бейджем на карточке «принято»: галочка не исчезает,
   *  а перелетает туда, где продолжится. */
  morphId?: string;
}) {
  const reduced = useReducedMotion();
  const busy = phase !== "idle";

  return (
    <div className={`flex w-full justify-center ${className}`}>
      <motion.button
        type="submit"
        disabled={busy}
        initial={false}
        animate={{ width: busy ? SIZE : "100%" }}
        transition={reduced ? { duration: 0 } : spring}
        style={{ height: SIZE }}
        aria-live="polite"
        aria-label={
          phase === "loading"
            ? "Отправляем заявку"
            : phase === "ok"
              ? "Заявка принята"
              : label
        }
        className="btn-gold relative overflow-hidden px-0 text-base disabled:cursor-default"
      >
        <AnimatePresence initial={false} mode="wait">
          {phase === "idle" && (
            <motion.span
              key="label"
              initial={gone}
              animate={enter}
              exit={gone}
              transition={swap}
              className="whitespace-nowrap px-6"
            >
              {label}
            </motion.span>
          )}

          {phase === "loading" && (
            <motion.span
              key="spinner"
              initial={gone}
              animate={enter}
              exit={gone}
              transition={swap}
              className="flex"
            >
              <Spinner spin={!reduced} />
            </motion.span>
          )}

          {phase === "ok" && (
            <motion.span
              key="check"
              layoutId={morphId}
              initial={gone}
              animate={enter}
              transition={swap}
              className="flex"
            >
              <CheckMark draw={!reduced} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

function Spinner({ spin }: { spin: boolean }) {
  return (
    <motion.svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      animate={spin ? { rotate: 360 } : undefined}
      transition={{ duration: 0.85, ease: "linear", repeat: Infinity }}
    >
      <circle
        cx="11"
        cy="11"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="2"
      />
      <path
        d="M11 2a9 9 0 0 1 9 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export function CheckMark({ draw = false }: { draw?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M5 12.5 10 17.5 19 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={draw ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
