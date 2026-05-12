"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { m } from "motion/react";
import type { Project } from "@/lib/site-data";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

/**
 * Editorial work spread.
 *
 * Each project gets its own "spread" instead of a row. Layout alternates
 * image-left / image-right per index so the section reads as a composed
 * magazine feature, not a templated grid.
 *
 * Hierarchy (desktop):
 *   [accent line · 01/05 · company]                    [dates]
 *   ┌─────────────────────────┐    Project Title (display)
 *   │                         │    One-liner (lede)
 *   │       cover 16:10       │    Stack · pills
 *   │                         │    Read case study  →
 *   └─────────────────────────┘
 *
 * The cover is large and quiet; the type does the talking. Hover stays
 * inside the spread's own bounding box — no floating cards, no layout shift.
 * The CTA arrow is a circular target that fills with the project's accent
 * color on hover, tying the spread to the per-project palette.
 */
export function WorkFeature({
  project,
  idx,
  total,
  imageSrcs,
}: {
  project: Project;
  idx: number;
  total: number;
  /** Optional image override(s).
   *
   *   - undefined or empty  → use `project.cover` as a single cover image.
   *   - length === 1        → use that src as a single cover image (real
   *                           asset replacing the placeholder SVG).
   *   - length >= 2         → render the side-by-side phone showcase
   *                           (Play Store feature-graphic style) on the
   *                           project's accent gradient.
   */
  imageSrcs?: string[];
}) {
  const reduced = usePrefersReducedMotion();
  const flipped = idx % 2 === 1;
  const accent =
    project.accent === "cobalt"
      ? "var(--color-cobalt)"
      : project.accent === "plum"
        ? "var(--color-plum)"
        : "var(--color-ember)";
  const showcase = imageSrcs !== undefined && imageSrcs.length >= 2;
  const singleSrc =
    imageSrcs && imageSrcs.length === 1 && imageSrcs[0] ? imageSrcs[0] : project.cover;

  return (
    <m.li
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      className="group border-t border-[var(--color-border)] py-14 last:border-b sm:py-20 md:py-28"
    >
      {/* Meta strip: accent rule · index/total · company  ——  dates */}
      <div className="mb-8 flex items-baseline justify-between gap-4 sm:mb-12">
        <div className="flex items-baseline gap-3 sm:gap-5">
          <span
            aria-hidden
            className="block h-px w-10 translate-y-[-3px] sm:w-16"
            style={{ background: accent }}
          />
          <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-subtle)] uppercase sm:text-[length:var(--text-sm)]">
            <span className="text-[var(--color-fg-muted)]">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span className="opacity-50"> / {String(total).padStart(2, "0")}</span>
            <span aria-hidden className="mx-2 opacity-40">
              ·
            </span>
            {project.company}
          </span>
        </div>
        <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-subtle)] uppercase sm:text-[length:var(--text-sm)]">
          {project.dates}
        </span>
      </div>

      <Link
        href={`/work/${project.slug}`}
        aria-label={`Read the ${project.name} case study`}
        className="grid grid-cols-12 items-center gap-x-4 gap-y-8 sm:gap-x-8 md:gap-y-0"
      >
        {/* Cover */}
        <div
          className={cn(
            "col-span-12 md:col-span-7",
            flipped && "md:order-2 md:col-start-6",
          )}
        >
          <div
            className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-sunken)]"
            style={{
              outline: `1px solid color-mix(in oklab, ${accent} 45%, transparent)`,
              outlineOffset: "-1px",
            }}
          >
            {showcase ? (
              <PhoneShowcase images={imageSrcs!} accent={accent} priority={idx < 2} />
            ) : (
              <Image
                src={singleSrc}
                alt=""
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover transition-transform duration-[var(--duration-hero)] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                priority={idx < 2}
              />
            )}
            {/* Accent glaze appears on hover — keeps the per-project color in the language */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-section)] ease-[var(--ease-out-expo)] group-hover:opacity-100"
              style={{
                background: `linear-gradient(180deg, transparent 55%, color-mix(in oklab, ${accent} 38%, transparent) 100%)`,
              }}
            />
            {/* Quiet "view" badge bottom-right, mono, only on hover (desktop) */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 bottom-4 hidden translate-y-2 items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--color-bg)]/85 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg)] uppercase opacity-0 backdrop-blur transition-[opacity,transform] duration-[var(--duration-hover)] ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 md:inline-flex"
            >
              View case
              <ArrowUpRight className="size-3.5" />
            </span>
          </div>
        </div>

        {/* Right column (or left, when flipped): title · oneLiner · stack · CTA */}
        <div
          className={cn(
            "col-span-12 flex flex-col gap-5 md:col-span-5 md:gap-7 md:pl-4",
            flipped && "md:order-1 md:col-start-1 md:pr-4 md:pl-0",
          )}
        >
          <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] leading-[0.95] tracking-[var(--tracking-tight)] sm:text-[length:var(--text-5xl)]">
            <span className="inline-block transition-transform duration-[var(--duration-hover)] ease-[var(--ease-out-expo)] group-hover:translate-x-1">
              {project.name}
            </span>
          </h3>

          <p className="max-w-[44ch] text-[length:var(--text-base)] leading-[var(--leading-body)] text-[var(--color-fg-muted)] sm:text-[length:var(--text-lg)]">
            {project.oneLiner}
          </p>

          <ul className="-mt-1 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-1 flex items-center gap-3 text-[length:var(--text-sm)] sm:mt-2">
            <span className="font-[family-name:var(--font-mono)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg)] uppercase">
              Read case study
            </span>
            <span
              aria-hidden
              className="relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-strong)] transition-[border-color,transform] duration-[var(--duration-hover)] ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:border-transparent"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-[var(--duration-section)] ease-[var(--ease-out-expo)] group-hover:scale-y-100"
                style={{ background: accent }}
              />
              <ArrowUpRight className="relative z-10 size-4 text-[var(--color-fg)] transition-colors duration-[var(--duration-hover)] group-hover:text-[var(--color-accent-fg)]" />
            </span>
          </div>
        </div>
      </Link>
    </m.li>
  );
}

/**
 * PhoneShowcase — two device screenshots on a project-accent gradient.
 *
 * Composition rules:
 *   - Phones are mirrored-tilted (-4° / +4°), foreground on the right
 *     (z-index higher) so the eye lands on the second screen first.
 *   - Background uses the project accent at two opacities + the page's
 *     existing noise texture for film-grain warmth.
 *   - Cover container's hover-scale lives on the outer wrapper; this
 *     component itself is static — keeps the parallax feel without
 *     fighting the parent transform.
 */
function PhoneShowcase({
  images,
  accent,
  priority,
}: {
  images: string[];
  accent: string;
  priority?: boolean;
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden transition-transform duration-[var(--duration-hero)] ease-[var(--ease-out-expo)] group-hover:scale-[1.025]"
      style={{
        background: `radial-gradient(120% 80% at 30% 20%, color-mix(in oklab, ${accent} 55%, transparent) 0%, transparent 60%), radial-gradient(100% 80% at 80% 100%, color-mix(in oklab, ${accent} 80%, var(--color-ink) 35%) 0%, color-mix(in oklab, ${accent} 95%, var(--color-ink) 55%) 100%)`,
      }}
    >
      {/* Film-grain texture overlay — uses the same noise.svg the page already loads */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
        style={{ backgroundImage: "var(--noise)", backgroundSize: "240px 240px" }}
      />

      {/* Mono "Android · Play Store" badge — small contextual signal */}
      <span
        aria-hidden
        className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--color-ink)]/45 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-ivory)]/85 uppercase backdrop-blur-sm"
      >
        <span className="size-1 rounded-full bg-[var(--color-ivory)]/70" />
        Android · Play Store
      </span>

      {/* The phone pair — mirrored tilt, slight offset */}
      <div className="absolute inset-0 flex items-center justify-center gap-3 px-6 sm:gap-6 sm:px-12">
        {images.slice(0, 2).map((src, i) => (
          <div
            key={src}
            className="relative aspect-[9/16] h-[88%] overflow-hidden rounded-[18px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5),0_8px_16px_-6px_rgb(0_0_0/0.3)] ring-1 ring-black/30"
            style={{
              transform: `rotate(${i === 0 ? -4 : 4}deg) translateY(${i === 0 ? "0" : "-10px"})`,
              zIndex: i === 0 ? 1 : 2,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 768px) 22vw, 40vw"
              className="object-cover"
              priority={priority}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
