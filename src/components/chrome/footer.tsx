"use client";
import { useCallback, useEffect, useState } from "react";
import { Check, Clipboard } from "lucide-react";
import { Signature } from "@/components/primitives/signature";
import { cn } from "@/lib/cn";

const EMAIL = "hasan.jsdev@gmail.com";
const RESET_MS = 2400;

/**
 * Footer — signed off, with one easter-egg moment.
 *
 * Audit of what would normally live in a footer:
 *   - Nav links            → already in the sticky header.
 *   - Email + socials      → already in the Contact block.
 *   - Location stamp       → already in the Hero ("Dhaka, BD").
 *   - "What I'm now doing" → already in the /now strip.
 *
 * Conclusion: the footer has no *informational* job left. It does ONE
 * bespoke thing — render the hand-drawn signature (the most personal
 * artifact in the codebase) AS a copy-email button. Hover/focus reveals
 * the actual email under the signature; click copies it and confirms.
 *
 * That's discoverable craft (Awwwards-grade) and a real keyboard-accessible
 * action (a11y-grade). The copyright line below adds one fact not stated
 * anywhere else on the page — the *kind* of work the operator is open to.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), RESET_MS);
    return () => window.clearTimeout(id);
  }, [copied]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      // Clipboard API can fail (insecure context, permission denied). Gracefully
      // fall back to opening the mail client so the user still gets to email.
      window.location.href = `mailto:${EMAIL}`;
    }
  }, []);

  return (
    <footer className="border-t border-[var(--color-border)] px-[var(--gutter)] py-20 sm:py-28">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-center gap-10 sm:gap-12">
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${EMAIL} to clipboard`}
          className="group relative flex cursor-copy flex-col items-center gap-5"
        >
          <Signature size="md" />

          <span
            aria-hidden
            className={cn(
              "inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] uppercase transition-[opacity,transform] duration-[var(--duration-hover)] ease-[var(--ease-out-expo)]",
              copied
                ? "translate-y-0 text-[var(--color-fg)] opacity-100"
                : "translate-y-1 text-[var(--color-fg-subtle)] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
            )}
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-[var(--color-accent)]" />
                Copied to clipboard
              </>
            ) : (
              <>
                <Clipboard className="size-3.5" />
                {EMAIL}
              </>
            )}
          </span>
        </button>

        {/* Polite SR announcement on copy — visual change above is aria-hidden */}
        <span role="status" aria-live="polite" className="sr-only">
          {copied ? `Email ${EMAIL} copied to clipboard` : ""}
        </span>

        <p className="text-center font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-subtle)] uppercase">
          © {year} Mahamud Hasan
          <span aria-hidden className="mx-2 text-[var(--color-fg-subtle)]/60">
            —
          </span>
          Open to founding-engineer &amp; staff-level conversations.
        </p>
      </div>
    </footer>
  );
}
