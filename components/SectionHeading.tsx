export function SectionHeading({
  overline,
  title,
  subtitle,
  center = false,
}: {
  overline: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div
        className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold ${
          center ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-gold/50" />
        {overline}
        {center && <span className="h-px w-8 bg-gold/50" />}
      </div>
      <h2 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-text">{subtitle}</p>
      )}
    </div>
  );
}
