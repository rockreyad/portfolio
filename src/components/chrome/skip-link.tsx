export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[var(--radius-md)] focus:bg-[var(--color-fg)] focus:px-4 focus:py-2 focus:text-[var(--color-bg)]"
    >
      Skip to content
    </a>
  );
}
