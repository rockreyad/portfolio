import { Loader2 } from "lucide-react";

export default function CvLoading() {
  return (
    <div className="relative pt-24 sm:pt-28" aria-busy="true" aria-live="polite">
      <header className="sticky top-20 z-10 border-y border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur-md sm:top-24">
        <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between gap-4 px-[var(--gutter)] py-3 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="size-5 shrink-0 rounded-[var(--radius-xs)] bg-[var(--color-bg-sunken)]" />
            <div className="min-w-0 space-y-2">
              <div className="h-3 w-40 rounded-[var(--radius-xs)] bg-[var(--color-bg-sunken)]" />
              <div className="h-2 w-28 rounded-[var(--radius-xs)] bg-[var(--color-bg-sunken)]" />
            </div>
          </div>
          <div className="h-10 w-32 rounded-[var(--radius-pill)] bg-[var(--color-bg-sunken)]" />
        </div>
      </header>

      <section className="mx-auto w-full max-w-3xl px-[var(--gutter)] py-10 pb-20 sm:py-14 sm:pb-28 lg:max-w-4xl xl:max-w-5xl">
        <div className="flex w-full flex-col items-center gap-3">
          <div className="aspect-[51/66] w-full animate-pulse rounded-[var(--radius-md)] bg-[var(--color-bg-sunken)] ring-1 ring-black/5" />
          <div className="inline-flex items-center gap-2 text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
            <Loader2 className="size-3.5 animate-spin" aria-hidden /> Loading PDF…
          </div>
        </div>
      </section>
      <span className="sr-only">Loading CV…</span>
    </div>
  );
}
