import { stat } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CvViewerShell } from "./cv-viewer-shell";

const PDF_PATH = "/mahamud-hasan-cv.pdf";
const PDF_FILENAME = "mahamud-hasan-cv.pdf";

export const metadata: Metadata = buildMetadata({
  title: "CV",
  description:
    "Curriculum Vitae of Mahamud Hasan — full-stack software engineer at Kaon, based in Dhaka.",
  path: "/cv",
});

// Unrolled to two explicit `path.join` calls with literal arguments so
// Turbopack's NFT tracer can scope each one to a single file. The earlier
// `for (const file of [...])` form looked dynamic to the tracer and caused
// it to trace the whole project into this route's manifest.
function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

async function getLastUpdated(): Promise<string | null> {
  const cwd = process.cwd();
  try {
    const s = await stat(path.join(cwd, "cv", "main.tex"));
    return formatDate(s.mtime);
  } catch {
    // LaTeX source isn't present in production — fall back to the PDF.
  }
  try {
    const s = await stat(path.join(cwd, "public", "mahamud-hasan-cv.pdf"));
    return formatDate(s.mtime);
  } catch {
    return null;
  }
}

export default async function CvPage() {
  const lastUpdated = await getLastUpdated();

  return (
    <div className="relative pt-24 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60dvh]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--color-accent) 6%, transparent) 0%, transparent 60%)",
        }}
      />

      <header className="sticky top-20 z-10 border-y border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur-md sm:top-24">
        <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between gap-4 px-[var(--gutter)] py-3 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <FileText
              className="size-5 shrink-0 text-[var(--color-fg-muted)]"
              aria-hidden
            />
            <div className="min-w-0">
              <h1 className="truncate font-[family-name:var(--font-display)] text-[length:var(--text-lg)] leading-tight">
                Curriculum Vitae
              </h1>
              {lastUpdated && (
                <p className="truncate text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
                  Updated {lastUpdated}
                </p>
              )}
            </div>
          </div>

          <a
            href={PDF_PATH}
            download={PDF_FILENAME}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-4 text-[length:var(--text-sm)] font-medium text-[var(--color-accent-fg)] transition-[filter,transform] duration-[var(--duration-hover)] ease-[var(--ease-out-expo)] hover:brightness-105 active:translate-y-px sm:px-5"
          >
            <Download className="size-4" aria-hidden />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">Download</span>
          </a>
        </div>
      </header>

      <section className="mx-auto w-full max-w-3xl px-[var(--gutter)] py-10 pb-20 sm:py-14 sm:pb-28 lg:max-w-4xl xl:max-w-5xl">
        <CvViewerShell src={PDF_PATH} />

        <p className="mt-12 text-center font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-subtle)] uppercase sm:mt-16">
          <span
            aria-hidden
            className="mr-2 inline-block size-1 translate-y-[-3px] rounded-full bg-[var(--color-accent)]"
          />
          Typeset in XeLaTeX
        </p>
      </section>
    </div>
  );
}
