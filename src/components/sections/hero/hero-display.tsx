"use client";
import dynamic from "next/dynamic";
import { SplitText } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/primitives/button";
import { ArrowDown } from "lucide-react";

const HeroMesh = dynamic(() => import("./hero-mesh").then((m) => m.HeroMesh), {
  ssr: false,
  loading: () => null,
});

/**
 * Hero — production-design intent:
 *
 * The MOST UNIQUE thing on the page is the NAME, so the name is the loudest
 * element. "Software engineer" is commodity copy; it lives as a small mono
 * label below. The handle "rockreyad" is the personal-brand moment, set in
 * Kalmansk (the one playful accent in the whole system).
 *
 * Composition is centered to lean into the magazine-cover / personal-landing
 * energy and to let HeroMesh breathe behind the type.
 */
export function HeroDisplay() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[92dvh] flex-col items-center justify-center overflow-hidden px-[var(--gutter)] py-24 text-center sm:min-h-[96dvh] sm:py-32"
    >
      <div className="absolute inset-0 -z-10">
        <HeroMesh />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, color-mix(in oklab, var(--color-bg) 40%, transparent) 60%, var(--color-bg) 100%)",
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col items-center gap-8 sm:gap-10">
        {/* Eyebrow — location + availability, in mono, for that engineer-tagged feel */}
        <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase sm:text-[length:var(--text-sm)]">
          <span aria-hidden className="mr-2 inline-block size-1.5 rounded-full bg-[var(--color-accent)] align-middle" />
          Dhaka, BD · Available for select work
        </p>

        {/* THE NAME — biggest element on the page. Satoshi Black is the one
            "loud sans" moment; the rest of the site is editorial Lovato. */}
        <h1
          id="hero-title"
          className="font-[family-name:var(--font-sans)] text-[length:var(--text-display)] leading-[0.9] font-black tracking-[var(--tracking-display)]"
        >
          <SplitText by="word" text="Mahamud" className="block" />
          <SplitText by="word" text="Hasan." delay={0.1} className="block" />
        </h1>

        {/* Personal-brand moment — Kalmansk treatment on the handle, the one
            decorative voice in the whole system. */}
        <p className="flex flex-wrap items-baseline justify-center gap-x-3">
          <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-subtle)] uppercase">
            aka
          </span>
          <span className="font-[family-name:var(--font-accent)] text-[length:var(--text-3xl)] leading-none text-[var(--color-accent)] sm:text-[length:var(--text-4xl)]">
            rockreyad
          </span>
        </p>

        {/* Role tag — small mono label, the commodity copy in its proper place. */}
        <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase sm:text-[length:var(--text-sm)]">
          Software Engineer · Kaon
        </p>

        {/* Lede — full credentials, narrow column, centered */}
        <p className="mx-auto mt-2 max-w-[58ch] text-[length:var(--text-lg)] leading-[var(--leading-body)] text-[var(--color-fg-muted)] sm:text-[length:var(--text-xl)]">
          Full-stack engineer shipping <span className="text-[var(--color-fg)]">FlowGPT</span> and{" "}
          <span className="text-[var(--color-fg)]">Emochi</span> to millions. Independent founder
          who took <span className="text-[var(--color-fg)]">LiveSnaps</span> to $50K+ in worldwide
          sales.
        </p>

        <div className="mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <Magnetic className="block">
            <Button href="#work" variant="primary" size="lg" className="w-full sm:w-auto">
              View selected work
            </Button>
          </Magnetic>
          <Button href="/cv" variant="secondary" size="lg" className="w-full sm:w-auto">
            Resume
          </Button>
        </div>
      </div>

      <a
        href="#work"
        aria-label="Scroll to selected work"
        className="absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase transition-colors hover:text-[var(--color-fg)] sm:bottom-12"
      >
        <ArrowDown className="size-4 motion-safe:animate-bounce" aria-hidden /> Scroll
      </a>
    </section>
  );
}
