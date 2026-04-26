"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Contrast } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function cycleTheme() {
    const current = (theme === "system" ? resolvedTheme : theme) ?? "light";
    const next = current === "light" ? "dark" : current === "dark" ? "hc" : "light";
    setTheme(next);
  }

  const current = mounted ? ((theme === "system" ? resolvedTheme : theme) ?? "light") : "light";
  const Icon = current === "dark" ? Moon : current === "hc" ? Contrast : Sun;

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-[var(--gutter)]">
      <nav
        aria-label="Primary"
        className="flex max-w-full items-center gap-0.5 overflow-hidden rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg)]/80 px-1.5 py-1 backdrop-blur-md sm:gap-1 sm:px-2 sm:py-1.5"
      >
        <Link
          href="/"
          className="px-2.5 py-1 font-[family-name:var(--font-display)] text-[length:var(--text-base)] sm:px-3"
        >
          M.H.
        </Link>
        <span aria-hidden className="mx-0.5 h-4 w-px bg-[var(--color-border)] sm:mx-1" />
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="rounded-[var(--radius-pill)] px-2.5 py-1 text-[length:var(--text-sm)] text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-sunken)] hover:text-[var(--color-fg)] sm:px-3"
          >
            {n.label}
          </Link>
        ))}
        <span aria-hidden className="mx-0.5 h-4 w-px bg-[var(--color-border)] sm:mx-1" />
        <button
          type="button"
          onClick={cycleTheme}
          aria-label={`Theme: ${current}. Click to switch.`}
          className="inline-flex size-8 items-center justify-center rounded-[var(--radius-pill)] text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-sunken)] hover:text-[var(--color-fg)]"
        >
          <Icon className="size-4" aria-hidden />
        </button>
      </nav>
    </header>
  );
}
