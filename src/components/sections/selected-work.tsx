import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SELECTED_WORK } from "@/lib/site-data";
import { WorkFeature } from "./work-feature";
import { FeaturedCase } from "./featured-case";

/**
 * Per-project image overrides.
 *
 * Used when a project has real, high-resolution assets that should
 * replace the placeholder cover SVG in either:
 *   - the FeaturedCase full-bleed slot (single hero image), or
 *   - the WorkFeature spread cover (single image OR two-image phone pair).
 *
 * Keys are project slugs from `SELECTED_WORK`. Values are paths under
 * /public. Add new projects here as real assets land — nothing else
 * needs to change.
 *
 * SPREAD_IMAGES routing rule (in WorkFeature):
 *   - 1 entry  → single cover image
 *   - 2+ entries → side-by-side phone showcase on accent gradient
 */
const FEATURED_IMAGE: Record<string, string> = {
  flowgpt: "/images/flowgpt/portrait.avif",
};

const SPREAD_IMAGES: Record<string, string[]> = {
  emochi: ["/images/emochi/ai-chat-app.webp", "/images/emochi/talk-snap.webp"],
  takenote: ["/images/takenote/2024.avif"],
};

/**
 * Selected Work — editorial showcase.
 *
 * Layout:
 *   1. Section header (eyebrow + headline + meta)        ← container
 *   2. Featured case — full-bleed lead-in (project 01)   ← breaks container
 *   3. Remaining spreads, numbered 02 → 05               ← container
 *
 * This is the Apple/Stripe "Featured Customer" pattern. The strongest
 * project gets cinematic treatment; the rest are the supporting cast.
 * The featured project is hard-coded as SELECTED_WORK[0] — the data
 * model already implies a ranked order (FlowGPT first), so plucking the
 * top item is honest, not an editor decision baked into render.
 *
 * Header sizing rationale (unchanged): hero and contact own the page's
 * two display moments; section headers are signage, not display.
 */
export function SelectedWork() {
  const featured = SELECTED_WORK[0];
  const rest = SELECTED_WORK.slice(1);
  const total = SELECTED_WORK.length;

  return (
    <section id="work" aria-labelledby="work-title" className="py-24 sm:py-32 md:py-44">
      {/* Section header — container-aligned */}
      <div className="px-[var(--gutter)]">
        <div className="mx-auto max-w-[var(--container-max)]">
          <header className="grid grid-cols-12 gap-x-6 gap-y-8 md:gap-x-8">
            <div className="col-span-12 flex flex-col gap-5 md:col-span-8 md:gap-6">
              <span className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase sm:text-[length:var(--text-sm)]">
                <span aria-hidden className="size-1.5 rounded-full bg-[var(--color-accent)]" />
                Selected work
              </span>
              <h2
                id="work-title"
                className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-[1.08] tracking-[var(--tracking-tight)] text-balance sm:text-[length:var(--text-4xl)] sm:leading-[1.05]"
              >
                Five products. From a $50K solo Android app to AI platforms used by{" "}
                <em className="not-italic text-[var(--color-accent)]">millions</em>.
              </h2>
            </div>

            <div className="col-span-12 flex flex-row items-center justify-between gap-4 md:col-span-4 md:flex-col md:items-end md:justify-start md:gap-4 md:pt-2">
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-subtle)] uppercase sm:text-[length:var(--text-sm)]">
                2021 → Now · 05 entries
              </span>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg)] uppercase underline-offset-4 hover:underline sm:text-[length:var(--text-sm)]"
              >
                All work
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-[var(--duration-hover)] ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </header>
        </div>
      </div>

      {/* Featured case — full-bleed (sits between header and spreads).
          The data's `cover` field still points at the placeholder SVG used
          on /work listings; FEATURED_IMAGE above maps slug → real asset
          for the cinematic moment, scoped to this render only. */}
      {featured && (
        <FeaturedCase
          project={featured}
          total={total}
          imageSrc={FEATURED_IMAGE[featured.slug]}
        />
      )}

      {/* Remaining spreads, numbered continuing from 02 */}
      <div className="px-[var(--gutter)]">
        <div className="mx-auto max-w-[var(--container-max)]">
          <ul className="flex flex-col">
            {rest.map((p, i) => (
              <WorkFeature
                key={p.slug}
                project={p}
                idx={i + 1}
                total={total}
                imageSrcs={SPREAD_IMAGES[p.slug]}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
