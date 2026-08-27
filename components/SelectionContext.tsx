"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export const MASTER_PREFIX = "Мастер: ";

type SelectionCtx = {
  selected: string[];
  toggle: (name: string) => void;
  /** Toggles a value while keeping at most one entry with the given prefix. */
  toggleExclusive: (name: string, prefix: string) => void;
  remove: (name: string) => void;
  clear: () => void;
  has: (name: string) => boolean;
};

const Ctx = createContext<SelectionCtx | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback(
    (name: string) =>
      setSelected((s) =>
        s.includes(name) ? s.filter((x) => x !== name) : [...s, name]
      ),
    []
  );

  const toggleExclusive = useCallback(
    (name: string, prefix: string) =>
      setSelected((s) => {
        if (s.includes(name)) return s.filter((x) => x !== name);
        return [...s.filter((x) => !x.startsWith(prefix)), name];
      }),
    []
  );

  const remove = useCallback(
    (name: string) => setSelected((s) => s.filter((x) => x !== name)),
    []
  );
  const clear = useCallback(() => setSelected([]), []);

  return (
    <Ctx.Provider
      value={{
        selected,
        toggle,
        toggleExclusive,
        remove,
        clear,
        has: (n) => selected.includes(n),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useSelection() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSelection must be used within SelectionProvider");
  return c;
}
