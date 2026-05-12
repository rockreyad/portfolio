import { cn } from "@/lib/cn";
import * as React from "react";

type Variant = "display" | "h1" | "h2" | "h3" | "lede" | "body" | "small" | "eyebrow";
const styles: Record<Variant, string> = {
  display:
    "font-[family-name:var(--font-display)] font-bold tracking-[var(--tracking-display)] leading-[var(--leading-display)] text-[length:var(--text-display)]",
  h1: "font-[family-name:var(--font-display)] font-bold tracking-[var(--tracking-tight)] leading-[var(--leading-heading)] text-[length:var(--text-5xl)]",
  h2: "font-[family-name:var(--font-display)] font-semibold tracking-[var(--tracking-tight)] leading-[var(--leading-heading)] text-[length:var(--text-4xl)]",
  h3: "font-[family-name:var(--font-display)] font-semibold tracking-[var(--tracking-tight)] leading-[var(--leading-heading)] text-[length:var(--text-3xl)]",
  lede: "text-[length:var(--text-xl)] leading-[var(--leading-body)] text-[var(--color-fg-muted)]",
  body: "text-[length:var(--text-base)] leading-[var(--leading-body)]",
  small: "text-[length:var(--text-sm)] leading-[var(--leading-body)] text-[var(--color-fg-muted)]",
  eyebrow:
    "text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] uppercase text-[var(--color-fg-muted)] font-medium",
};

type Props<T extends React.ElementType> = {
  as?: T;
  variant?: Variant;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

export function Text<T extends React.ElementType = "p">({
  as,
  variant = "body",
  className,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "p") as React.ElementType;
  return <Tag className={cn(styles[variant], className)} {...rest} />;
}
