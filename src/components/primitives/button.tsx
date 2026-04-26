import { cn } from "@/lib/cn";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-accent-fg)] hover:brightness-105 active:bg-[var(--color-ember-deep)]",
  secondary:
    "bg-transparent text-[var(--color-fg)] border border-[var(--color-border-strong)] hover:bg-[var(--color-bg-sunken)]",
  ghost: "bg-transparent text-[var(--color-fg)] hover:bg-[var(--color-bg-sunken)]",
};
const sizeClass: Record<Size, string> = {
  md: "h-10 px-4 text-[length:var(--text-sm)]",
  lg: "h-12 px-6 text-[length:var(--text-base)]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-medium transition-[background-color,color,box-shadow,filter] duration-[var(--duration-hover)] ease-[var(--ease-out-expo)] focus-visible:outline-none";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & { href: string };
type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", external, className, children } = props;
  const cls = cn(base, variantClass[variant], sizeClass[size], className);

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={cls}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
        {external && <ArrowUpRight className="size-4" aria-hidden />}
      </Link>
    );
  }
  const btn = props as ButtonAsButton;
  return (
    <button type={btn.type ?? "button"} onClick={btn.onClick} className={cls}>
      {children}
    </button>
  );
}
