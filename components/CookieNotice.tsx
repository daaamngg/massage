"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const KEY = "cookie-notice-ok";

// Маленькое хранилище «уведомление закрыто»: localStorage + запасной флаг
// в памяти, если хранилище недоступно (приватный режим).
let dismissedInMemory = false;
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot() {
  if (dismissedInMemory) return true;
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

// На сервере уведомление не рисуем — иначе расхождение при гидрации.
function getServerSnapshot() {
  return true;
}

// Уведомление о cookie: Роскомнадзор считает данные Метрики (cookie + IP)
// персональными. Показываем один раз, после «Понятно» больше не мешаем.
export function CookieNotice() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function accept() {
    dismissedInMemory = true;
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* приватный режим — хватит флага в памяти */
    }
    listeners.forEach((l) => l());
  }

  if (dismissed) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление о cookie"
      className="fixed bottom-5 left-4 right-20 z-50 rounded-2xl border border-gold/30 bg-surface/95 p-4 text-xs leading-relaxed text-text shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm"
    >
      <p>
        Сайт использует cookie и Яндекс.Метрику, чтобы становиться удобнее.
        Подробнее — в{" "}
        <Link href="/privacy" className="text-gold underline-offset-2 hover:underline">
          политике обработки данных
        </Link>
        .
      </p>
      <button
        type="button"
        onClick={accept}
        className="btn-gold mt-3 px-5 py-2 text-xs"
      >
        Понятно
      </button>
    </div>
  );
}
