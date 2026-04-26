import { Marquee } from "@/components/motion/marquee";
import { MARQUEE_LOGOS } from "@/lib/site-data";

export function MarqueeStrip() {
  const items = MARQUEE_LOGOS.map((label) => (
    <span
      className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-none tracking-[var(--tracking-tight)] text-[var(--color-fg)]/70 sm:text-[length:var(--text-4xl)]"
      key={label}
    >
      {label}
      <span aria-hidden className="mx-6 text-[var(--color-accent)] sm:mx-8">
        ●
      </span>
    </span>
  ));
  return (
    <section
      aria-label="Worked with"
      className="overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg-sunken)] py-6 sm:py-8"
    >
      <Marquee items={items} speed={28} />
    </section>
  );
}
