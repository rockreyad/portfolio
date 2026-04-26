export function CaseQuote({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <figure className="my-12 border-l-2 border-[var(--color-accent)] pl-6">
      <blockquote className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] leading-[var(--leading-heading)]">
        “{children}”
      </blockquote>
      {cite && (
        <figcaption className="mt-3 text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
          — {cite}
        </figcaption>
      )}
    </figure>
  );
}
