"use client";
import dynamic from "next/dynamic";
import { SplitText } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/primitives/button";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { ArrowDown } from "lucide-react";

const HeroMesh = dynamic(() => import("./hero-mesh").then((m) => m.HeroMesh), {
  ssr: false,
  loading: () => null,
});

export function HeroDisplay() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[88dvh] flex-col justify-end overflow-hidden px-[var(--gutter)] pt-28 pb-16 sm:min-h-[92dvh] sm:pt-32 sm:pb-20 md:pb-32"
    >
      <div className="absolute inset-0 -z-10">
        <HeroMesh />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--color-bg) 75%, transparent) 80%, var(--color-bg) 100%)",
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-6 sm:gap-8 md:gap-10">
        <Eyebrow>Mahamud Hasan · Dhaka, BD</Eyebrow>

        <h1
          id="hero-title"
          className="font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[var(--leading-display)] font-light tracking-[var(--tracking-display)]"
        >
          <SplitText by="word" text="Software" className="block" />
          <SplitText
            by="word"
            text="engineer."
            delay={0.1}
            className="block text-[var(--color-accent)] italic"
          />
        </h1>

        <p className="max-w-[58ch] text-[length:var(--text-lg)] leading-[var(--leading-body)] text-[var(--color-fg-muted)] sm:text-[length:var(--text-xl)]">
          Full-stack engineer at <span className="text-[var(--color-fg)]">Kaon</span> — shipping{" "}
          <span className="text-[var(--color-fg)]">FlowGPT</span> and{" "}
          <span className="text-[var(--color-fg)]">Emochi</span> to millions. Independent founder
          who took LiveSnaps to $50K+ in worldwide sales.
        </p>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Magnetic className="block">
            <Button href="#work" variant="primary" size="lg" className="w-full sm:w-auto">
              View selected work
            </Button>
          </Magnetic>
          <Button href="/cv" variant="secondary" size="lg" external className="w-full sm:w-auto">
            Resume
          </Button>
        </div>

        <a
          href="#work"
          className="mt-8 inline-flex items-center gap-2 self-start text-[length:var(--text-sm)] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] sm:mt-12"
        >
          <ArrowDown className="size-4 motion-safe:animate-bounce" aria-hidden /> Scroll
        </a>
      </div>
    </section>
  );
}
