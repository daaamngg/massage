import { Star } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { reviews } from "@/lib/site";

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            center
            overline="Отзывы"
            title="Что говорят наши гости"
            subtitle="Реальные отзывы из 2ГИС, ВКонтакте и Telegram."
          />
        </Reveal>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {reviews.map((r, i) => (
            <Reveal key={`${r.name}-${i}`} className="mb-5 break-inside-avoid">
              <div className="rounded-2xl border border-border bg-surface/40 p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-4 leading-relaxed text-text">«{r.text}»</p>
                <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="font-serif text-lg text-cream">{r.name}</span>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-text-dim">
                    {r.source}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
