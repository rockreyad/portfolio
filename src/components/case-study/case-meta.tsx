import type { CaseStudyMeta } from "@/content/work/_schema";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { ArrowUpRight } from "lucide-react";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-[var(--color-border)] py-4 first:border-t-0 first:pt-0">
      <Eyebrow>{label}</Eyebrow>
      <div className="text-[length:var(--text-base)] leading-snug">{children}</div>
    </div>
  );
}

export function CaseMeta({ meta }: { meta: CaseStudyMeta }) {
  return (
    <aside aria-label="Project details" className="md:sticky md:top-28 md:self-start">
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
        <Row label="Role">{meta.role}</Row>
        {meta.team && <Row label="Team">{meta.team}</Row>}
        <Row label="Dates">{meta.dates}</Row>
        <Row label="Stack">
          <ul className="flex flex-wrap gap-1.5">
            {meta.stack.map((s) => (
              <li
                key={s}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-2 py-0.5 text-[length:var(--text-xs)] text-[var(--color-fg-muted)]"
              >
                {s}
              </li>
            ))}
          </ul>
        </Row>
        {meta.url && (
          <Row label="Live">
            <a
              href={meta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--color-link)] underline-offset-4 hover:underline"
            >
              {new URL(meta.url).hostname.replace(/^www\./, "")}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </Row>
        )}
      </div>
    </aside>
  );
}
