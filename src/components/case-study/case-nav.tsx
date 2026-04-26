import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CaseStudyMeta } from "@/content/work/_schema";

export function CaseNav({
  prev,
  next,
}: {
  prev: CaseStudyMeta | null;
  next: CaseStudyMeta | null;
}) {
  return (
    <nav
      aria-label="Other case studies"
      className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-border)] md:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/work/${prev.slug}`}
          className="group flex flex-col gap-2 bg-[var(--color-bg-elevated)] p-8 transition-colors hover:bg-[var(--color-bg-sunken)]"
        >
          <span className="inline-flex items-center gap-2 text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase">
            <ArrowLeft
              className="size-3.5 transition-transform group-hover:-translate-x-1"
              aria-hidden
            />{" "}
            Previous
          </span>
          <span className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)]">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="bg-[var(--color-bg-elevated)] p-8" />
      )}
      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col items-end gap-2 bg-[var(--color-bg-elevated)] p-8 text-right transition-colors hover:bg-[var(--color-bg-sunken)]"
        >
          <span className="inline-flex items-center gap-2 text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase">
            Next{" "}
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </span>
          <span className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)]">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="bg-[var(--color-bg-elevated)] p-8" />
      )}
    </nav>
  );
}
