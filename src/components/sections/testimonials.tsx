"use client";
import { useEffect, useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { TESTIMONIALS, type Testimonial } from "@/lib/site-data";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Editorial testimonial section.
 *
 * Type strategy:
 * - Headline + ATTRIBUTION use Fraunces (display serif) — the "magazine voice"
 * - The QUOTE BODY uses the sans body face — easier to read at length, gives
 *   the long quotes air, keeps the eye relaxed
 * - A single oversized serif “ pulls the editorial weight without making the
 *   reader wade through 6 lines of italic display type
 *
 * This is the same trick The New Yorker / Bloomberg use: serif everywhere
 * EXCEPT the long-form pull quote, which goes sans for legibility.
 *
 * AnimatePresence with mode="wait" handles the swap; figure flows naturally
 * (no fixed min-h) so quotes of any length render without clipping.
 *
 * Auto-advances every 9s, paused on hover/focus. Reduced-motion: cross-fade
 * only, no autoplay.
 */
export function Testimonials() {
  const items: Testimonial[] = TESTIMONIALS;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % items.length), 9000);
    return () => window.clearTimeout(id);
  }, [active, paused, reduced, items.length]);

  const t = items[active];
  if (!t) return null;

  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative isolate overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg)] py-20 sm:py-28 md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Decorative oversized serif quote mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-12 -left-3 font-[family-name:var(--font-display)] text-[clamp(10rem,32vw,24rem)] leading-none text-[var(--color-accent)] opacity-[0.07] select-none sm:-top-20 sm:left-[var(--gutter)]"
      >
        “
      </span>

      <div className="relative mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)]">
        <header className="mb-10 flex flex-col gap-3 sm:mb-14 sm:gap-4">
          <Eyebrow>Words from the team · {String(items.length).padStart(2, "0")}</Eyebrow>
          <h2
            id="testimonials-title"
            className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-tight)] sm:text-[length:var(--text-4xl)]"
          >
            What collaborators say.
          </h2>
        </header>

        {/* Quote — sans body face, generous line-height, capped at sensible reading length */}
        <AnimatePresence mode="wait" initial={false}>
          <m.figure
            key={t.id}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(3px)" }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6, filter: "blur(2px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-12 gap-x-4 gap-y-6 sm:gap-x-6"
          >
            {/* Big serif quote glyph as a true editorial anchor.
                Sized like a drop-cap: large, in Ember, sitting flush with the
                first line of the quote. Does the work of opening punctuation
                AND visual weight. Inline punctuation in the body is removed. */}
            <span
              aria-hidden
              className="col-span-2 font-[family-name:var(--font-display)] text-[clamp(4rem,8vw,7rem)] leading-[0.7] text-[var(--color-accent)] select-none sm:col-span-1"
            >
              “
            </span>

            <div className="col-span-10 sm:col-span-11 md:col-span-10">
              <blockquote className="max-w-[58ch] font-[family-name:var(--font-sans)] text-[length:var(--text-xl)] leading-[1.55] font-normal tracking-[var(--tracking-normal)] text-[var(--color-fg)] sm:text-[length:var(--text-2xl)] sm:leading-[1.5] md:text-[clamp(1.5rem,2.4vw,2rem)]">
                {t.quote}
              </blockquote>

              <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] uppercase sm:mt-10 sm:text-[length:var(--text-sm)]">
                <span aria-hidden className="h-px w-8 bg-[var(--color-accent)] sm:w-10" />
                <span className="text-[var(--color-fg)]">{t.author.name}</span>
                {t.author.role && (
                  <span className="text-[var(--color-fg-muted)]">· {t.author.role}</span>
                )}
              </figcaption>
            </div>
          </m.figure>
        </AnimatePresence>

        {/* Numeral ticker nav */}
        <nav
          aria-label="Choose testimonial"
          className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--color-border)] pt-8 sm:mt-16 sm:gap-x-5"
        >
          {items.map((it, i) => {
            const isActive = i === active;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={`Show testimonial ${i + 1} of ${items.length}: ${themeLabel(it.theme)}`}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 py-2 text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] uppercase transition-colors ${
                  isActive
                    ? "text-[var(--color-fg)]"
                    : "text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)]"
                }`}
              >
                <span
                  aria-hidden
                  className={`size-1 rounded-full transition-opacity ${
                    isActive ? "bg-[var(--color-accent)] opacity-100" : "bg-current opacity-0"
                  }`}
                />
                <span className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] tracking-normal normal-case">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="hidden sm:inline">{themeLabel(it.theme)}</span>
              </button>
            );
          })}
          <span className="ml-auto shrink-0 text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </nav>
      </div>
    </section>
  );
}

function themeLabel(theme: Testimonial["theme"]) {
  switch (theme) {
    case "engineering":
      return "Engineering";
    case "ownership":
      return "Ownership";
    case "product":
      return "Product";
    case "collab":
      return "Collaboration";
    case "problem":
      return "Problem-solving";
  }
}
