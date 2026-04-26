import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  dotted = true,
}: {
  children: React.ReactNode;
  className?: string;
  dotted?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[length:var(--text-xs)] font-medium tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase",
        className,
      )}
    >
      {dotted && <span aria-hidden className="size-1.5 rounded-full bg-[var(--color-accent)]" />}
      {children}
    </span>
  );
}
