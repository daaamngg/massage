import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { legalEdition } from "@/lib/legal";

// Общий каркас юридических страниц: читаемая колонка, ссылка назад,
// дата редакции. Без анимаций — это документ, а не лендинг.
export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-text-dim transition-colors hover:text-gold"
      >
        <ArrowLeft size={15} /> На главную
      </Link>

      <h1 className="mt-8 font-serif text-3xl leading-tight text-cream sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm text-text-dim">Редакция от {legalEdition}</p>

      <div className="legal mt-10 space-y-5 text-[15px] leading-relaxed text-text">
        {children}
      </div>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3 pt-4">
      <h2 className="font-serif text-xl text-cream">{title}</h2>
      {children}
    </section>
  );
}
