import { Eyebrow } from "@/components/primitives/eyebrow";
import { Text } from "@/components/primitives/text";
import { Button } from "@/components/primitives/button";
import { FadeIn } from "@/components/motion/fade-in";

/**
 * About teaser — portrait-led spread.
 *
 * Content rule for this section: say things that aren't said anywhere
 * else on the homepage. The Hero already names the role, location,
 * employer, products, handle. The Selected Work spreads already show
 * the projects + numbers. So About must add NEW information — not
 * polished restatements.
 *
 * What's actually new here:
 *   - The pre-resume origin (paid worldwide users before a full-time job)
 *   - The temperament (calm, suspicious of clever code, patient)
 *   - The working habits (read design before schema, delete > guard)
 *   - The through-line claim ("Founder by habit") — Hero says
 *     "Software Engineer", not "founding-engineer pattern across 3
 *     companies + a solo product"
 *
 * Things deliberately NOT repeated from elsewhere on the page:
 *   - "based in Dhaka"           (Hero already says it)
 *   - "FlowGPT & Emochi at Kaon" (Hero + Featured Case + spreads)
 *   - "LiveSnaps $50K"           (Hero + Selected Work)
 *   - "rockreyad" handle         (Hero owns that moment)
 *   - "Most of what I build is still in production" — junk: that's
 *     true of any senior engineer. Not new information.
 *
 * Layout: 12-col grid, text on the LEFT (5 cols), portrait card on the
 * RIGHT (7 cols). Portrait is dominant — magazine profile convention.
 */
export function AboutTeaser() {
  return (
    <section
      aria-labelledby="about-title"
      className="px-[var(--gutter)] py-28 sm:py-36 md:py-44"
    >
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-12 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-0">
        {/* LEFT — text column */}
        <FadeIn className="col-span-12 flex flex-col gap-7 md:col-span-5 md:gap-8 md:pr-4 md:pt-2">
          <Eyebrow>About — the through-line</Eyebrow>

          <h2
            id="about-title"
            className="font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] leading-[1.02] tracking-[var(--tracking-tight)] text-balance sm:text-[length:var(--text-5xl)] sm:leading-[var(--leading-display)]"
          >
            Engineer first.{" "}
            <em className="not-italic text-[var(--color-accent)]">Founder by habit</em>.
          </h2>

          <Text variant="lede" className="max-w-[48ch]">
            Shipped a subscription Android app to paying users worldwide{" "}
            <em className="not-italic">before</em> I had my first full-time engineering job. The
            years before the resume taught me more about product than the years after.
          </Text>

          <Text as="p" variant="body" className="max-w-[48ch] text-[var(--color-fg-muted)]">
            These days I&apos;m calm in incidents, suspicious of clever code, and patient with
            refactors. I read the design before I write the schema, and I&apos;d rather delete code
            than guard it.
          </Text>

          <div className="mt-2">
            <Button href="/about" variant="secondary">
              More about me
            </Button>
          </div>
        </FadeIn>

        {/* RIGHT — portrait card */}
        <div className="col-span-12 md:col-span-7 md:pl-4">
          <FadeIn delay={0.12}>
            <PortraitCard />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/**
 * Bespoke portrait slot.
 *
 * Default: a duotone ink-on-ember card with an oversized Lovato "MH"
 * monogram, a soft radial vignette, and the grain noise texture used
 * elsewhere on the site. Reads as intentional design today.
 *
 * TO USE A REAL PHOTO: replace the entire inner block (everything inside
 * the rounded-radius-lg container) with:
 *
 *     <Image
 *       src="/portrait.jpg"
 *       alt="Mahamud Hasan"
 *       fill
 *       sizes="(min-width: 768px) 58vw, 100vw"
 *       className="object-cover"
 *       priority
 *     />
 *
 * Keep the caption strip; it works on both photo and monogram backgrounds.
 */
function PortraitCard() {
  return (
    <figure
      role="img"
      aria-label="Mahamud Hasan — portrait"
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-ember)] text-[var(--color-ivory)] ring-1 ring-black/5 shadow-[var(--shadow-card)] sm:aspect-[3/4]"
      style={{
        backgroundImage:
          "radial-gradient(120% 90% at 70% 0%, color-mix(in oklab, var(--color-ember-dark) 60%, transparent) 0%, transparent 55%), radial-gradient(80% 60% at 20% 100%, color-mix(in oklab, var(--color-plum) 70%, transparent) 0%, transparent 60%), var(--color-ember)",
      }}
    >
      {/* Noise texture overlay — uses the same noise.svg as the page grain.
          Mix-blend-overlay gives it a film-grain feel without dirtying color. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40"
        style={{
          backgroundImage: "var(--noise)",
          backgroundSize: "220px 220px",
        }}
      />

      {/* Hairline ember inner border for the framed-portrait feel */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-2.5 rounded-[calc(var(--radius-lg)-10px)] border border-white/15 sm:inset-3"
      />

      {/* Crop registration ticks — top-left & bottom-right, like a contact sheet */}
      <span aria-hidden className="pointer-events-none absolute top-5 left-5 opacity-50">
        <CropTick />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-5 bottom-5 rotate-180 opacity-50"
      >
        <CropTick />
      </span>

      {/* The monogram — the visual identity moment. Lovato display, oversized. */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-display)] text-[clamp(9rem,32vw,20rem)] leading-none font-bold tracking-[-0.06em] text-[var(--color-ivory)]/95 select-none"
      >
        MH
      </span>

      {/* Bottom caption strip — gives the card the magazine-portrait feel */}
      <figcaption className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-4 border-t border-white/15 bg-black/15 px-6 py-4 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] uppercase backdrop-blur-sm sm:px-8 sm:py-5">
        <span>Mahamud Hasan</span>
        <span className="text-white/70">Dhaka · 2026</span>
      </figcaption>
    </figure>
  );
}

/** Tiny corner registration tick — magazine contact-sheet detail. */
function CropTick() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M0 0 L0 12 M0 0 L12 0" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
