"use client";

import Link from "next/link";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-6 px-[var(--gutter)] text-center">
      <p className="font-[family-name:var(--font-display)] text-[length:var(--text-4xl)]">
        Something broke on my side.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-5 py-2 text-[var(--color-accent-fg)]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] px-5 py-2"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
