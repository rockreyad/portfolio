"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/site-data";

/**
 * Editorial work row.
 *
 * Layout (desktop): [number] [thumb] [title + meta] [stack] [arrow]
 * Layout (mobile):  [number ─ thumb]
 *                   [title]
 *                   [meta]
 *                   [stack pills + arrow]
 *
 * The thumbnail is *inline* (not a hover popup) — always visible, sized to
 * the row, accent-bordered. This makes the section legible at a glance and
 * removes the "popup card on hover" UX problem.
 *
 * Hover effects are subtle and contained: thumb image scales 1.05, row
 * background tints faintly, arrow drifts up-right. All within the row's
 * own bounding box — no absolute floats, no layout shift.
 */
export function WorkRow({ project, idx, total }: { project: Project; idx: number; total: number }) {
  const accentColor =
    project.accent === "cobalt"
      ? "var(--color-cobalt)"
      : project.accent === "plum"
        ? "var(--color-plum)"
        : "var(--color-ember)";

  return (
    <li className="group border-t border-[var(--color-border)] last:border-b">
      <Link
        href={`/work/${project.slug}`}
        className="grid grid-cols-12 items-center gap-x-4 gap-y-3 py-6 transition-colors duration-[var(--duration-hover)] hover:bg-[var(--color-bg-sunken)] sm:gap-x-6 sm:py-8 md:py-10"
        aria-label={`Read the ${project.name} case study`}
      >
        {/* Numeral */}
        <span
          className="col-span-2 pl-1 font-[family-name:var(--font-display)] text-[length:var(--text-base)] text-[var(--color-fg-subtle)] sm:col-span-1 sm:pl-2 sm:text-[length:var(--text-lg)]"
          aria-hidden
        >
          {String(idx + 1).padStart(2, "0")}
          <span className="opacity-50">/{String(total).padStart(2, "0")}</span>
        </span>

        {/* Inline thumbnail */}
        <div
          className="relative col-span-10 aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-sunken)] sm:col-span-3 md:col-span-2"
          style={{ outline: `1px solid ${accentColor}`, outlineOffset: "-1px" }}
        >
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 80vw"
            className="object-cover transition-transform duration-[var(--duration-hero)] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
          />
        </div>

        {/* Title + meta */}
        <div className="col-span-12 flex flex-col gap-1.5 sm:col-span-8 md:col-span-5">
          <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-[1] tracking-[var(--tracking-tight)] transition-transform duration-[var(--duration-hover)] ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 sm:text-[length:var(--text-4xl)]">
            {project.name}
          </h3>
          <p className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)] sm:text-[length:var(--text-sm)]">
            {project.role} · {project.company} · {project.dates}
          </p>
        </div>

        {/* Stack pills + arrow row (mobile) / desktop arm */}
        <div className="col-span-12 flex items-center justify-between gap-3 md:col-span-4">
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s) => (
              <li
                key={s}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-2 py-0.5 text-[length:var(--text-xs)] text-[var(--color-fg-muted)]"
              >
                {s}
              </li>
            ))}
          </ul>
          <ArrowUpRight
            aria-hidden
            className="size-5 shrink-0 text-[var(--color-fg-subtle)] transition-all duration-[var(--duration-hover)] ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--color-accent)]"
          />
        </div>
      </Link>
    </li>
  );
}
