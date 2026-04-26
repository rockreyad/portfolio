"use client";
import { m } from "motion/react";
import { useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function Marquee({
  items,
  speed = 32,
  pauseOnHover = true,
  className,
}: {
  items: React.ReactNode[];
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  if (reduced) {
    return (
      <div className={className} aria-hidden>
        <div className="flex flex-wrap gap-12 px-[var(--gutter)]">
          {items.map((it, i) => (
            <span key={i}>{it}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onFocus={() => pauseOnHover && setPaused(true)}
      onBlur={() => pauseOnHover && setPaused(false)}
    >
      <m.div
        className="flex w-max gap-16"
        animate={paused ? { x: undefined } : { x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((it, i) => (
          <span key={i} className="shrink-0">
            {it}
          </span>
        ))}
      </m.div>
    </div>
  );
}
