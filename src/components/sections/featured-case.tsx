"use client";
import Image from "next/image";
import Link from "next/link";
import { m } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import type { Project } from "@/lib/site-data";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Featured case — full-bleed lead-in.
 *
 * Apple/Stripe "Featured Customer" pattern. The strongest project in the
 * portfolio (FlowGPT — currently shipping, biggest scale, current employer)
 * gets promoted out of the spread list into a cinematic moment between the
 * Selected Work section header and the remaining spreads.
 *
 * Layout rules:
 *   - Image goes full-bleed (100vw, no container).
 *   - Supporting copy lives on a SOLID background BELOW the image, not
 *     overlaid. Apple pattern: text legibility never depends on image
 *     composition. (Avoids the double-title problem since the FlowGPT
 *     cover SVG already contains the product name.)
 *   - The image itself is the title. The body below is just one-liner +
 *     stack + CTA.
 *
 * Why FlowGPT was promoted: data-driven. It has the highest scale number
 * (6M users), is the current chapter (2023 — Present), is at the current
 * company (Kaon), and uses the page's primary accent (ember). Picking the
 * project whose accent matches the page's primary accent makes the
 * "featured" beat feel native to the page's color system.
 */
export function FeaturedCase({
  project,
  total,
  imageSrc,
}: {
  project: Project;
  total: number;
  /** Override the default `project.cover`. Use when the data points at a
   *  placeholder SVG but a real high-resolution asset exists for the
   *  cinematic full-bleed moment specifically. */
  imageSrc?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const accent =
    project.accent === "cobalt"
      ? "var(--color-cobalt)"
      : project.accent === "plum"
        ? "var(--color-plum)"
        : "var(--color-ember)";

  return (
    <m.section
      aria-label={`Featured case — ${project.name}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative my-14 sm:my-20 md:my-24"
    >
      {/* Eyebrow strip — container-aligned, above the full-bleed image */}
      <div className="mb-8 px-[var(--gutter)] sm:mb-12">
        <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-5">
            <span
              aria-hidden
              className="inline-flex size-7 items-center justify-center rounded-full"
              style={{ background: accent }}
            >
              <Star className="size-3.5 text-[var(--color-accent-fg)]" aria-hidden />
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase sm:text-[length:var(--text-sm)]">
              Featured case
              <span aria-hidden className="mx-2 opacity-40">·</span>
              <span className="text-[var(--color-fg-subtle)]">
                01 <span className="opacity-50">/ {String(total).padStart(2, "0")}</span>
              </span>
            </span>
          </div>
          <span className="hidden font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-subtle)] uppercase sm:inline">
            {project.dates}
          </span>
        </div>
      </div>

      {/* Full-bleed image — the lead moment. Aspect ratio is cinematic on
          desktop (21:9), more vertical on mobile so the cover's typography
          stays legible. The image IS the title; we don't overlay text. */}
      <Link
        href={`/work/${project.slug}`}
        aria-label={`Read the ${project.name} case study`}
        className="group block"
      >
        <div
          className="relative w-full overflow-hidden bg-[var(--color-bg-sunken)]"
          style={{
            borderTop: `1px solid color-mix(in oklab, ${accent} 60%, transparent)`,
            borderBottom: `1px solid color-mix(in oklab, ${accent} 60%, transparent)`,
          }}
        >
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] md:aspect-[21/9] md:max-h-[78vh]">
            <Image
              src={imageSrc ?? project.cover}
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover transition-transform duration-[var(--duration-hero)] ease-[var(--ease-out-expo)] group-hover:scale-[1.025]"
            />
            {/* Accent vignette on hover — keeps per-project color in language */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-section)] group-hover:opacity-100"
              style={{
                background: `radial-gradient(80% 60% at 50% 100%, color-mix(in oklab, ${accent} 35%, transparent) 0%, transparent 70%)`,
              }}
            />
            {/* Floating CTA pill, top-right of image */}
            <span
              aria-hidden
              className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--color-bg)]/85 px-3.5 py-1.5 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg)] uppercase shadow-[var(--shadow-card)] backdrop-blur transition-transform duration-[var(--duration-hover)] ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 sm:top-7 sm:right-7"
            >
              View
              <ArrowUpRight className="size-3.5" />
            </span>
          </div>
        </div>

        {/* Supporting copy — clean below the image, container-aligned.
            Apple pattern: text on solid bg, never on top of imagery. */}
        <div className="px-[var(--gutter)] pt-10 sm:pt-14 md:pt-16">
          <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-12 gap-x-6 gap-y-8 md:gap-x-8">
            <div className="col-span-12 md:col-span-7">
              <p className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] leading-[1.25] tracking-[var(--tracking-tight)] text-[var(--color-fg)] text-balance sm:text-[length:var(--text-3xl)] sm:leading-[1.18]">
                {project.oneLiner}
              </p>
            </div>
            <div className="col-span-12 flex flex-col gap-5 md:col-span-5 md:items-end md:text-right">
              <ul className="flex flex-wrap gap-1.5 md:justify-end">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 text-[length:var(--text-sm)]">
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
          </div>
        </div>
      </Link>
    </m.section>
  );
}
