export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] px-[var(--gutter)] py-8">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-start gap-2 text-[length:var(--text-xs)] text-[var(--color-fg-muted)] md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Mahamud Hasan</span>
        <span>Built in Dhaka · Deployed on Vercel</span>
      </div>
    </footer>
  );
}
