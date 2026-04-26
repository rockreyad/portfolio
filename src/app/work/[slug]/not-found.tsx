import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-6 px-[var(--gutter)] text-center">
      <p className="font-[family-name:var(--font-display)] text-[length:var(--text-5xl)]">
        That case study isn&apos;t here.
      </p>
      <Link href="/work" className="text-[var(--color-link)] underline-offset-4 hover:underline">
        ← All work
      </Link>
    </div>
  );
}
