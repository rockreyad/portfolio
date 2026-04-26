import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center gap-6 px-[var(--gutter)] text-center">
      <p className="font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] leading-none">
        Lost in the link graph.
      </p>
      <p className="max-w-[40ch] text-[var(--color-fg-muted)]">
        Either I broke a URL or you&apos;re probing my routing. Either way — let&apos;s get you
        back.
      </p>
      <Link href="/" className="text-[var(--color-link)] underline-offset-4 hover:underline">
        ← Home
      </Link>
    </div>
  );
}
