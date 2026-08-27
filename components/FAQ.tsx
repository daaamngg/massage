import { ChevronDown } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { faq } from "@/lib/site";

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading center overline="Вопросы и ответы" title="Коротко о важном" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 space-y-3">
            {faq.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-border bg-surface/40 px-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-cream [&::-webkit-details-marker]:hidden">
                  <span className="font-medium">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 text-gold transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="pb-5 leading-relaxed text-text-dim">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
