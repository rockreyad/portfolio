"use client";
import { m } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  text: string;
  className?: string;
  by?: "word" | "char";
  delay?: number;
};

const container = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { delayChildren: delay, staggerChildren: 0.025 },
  }),
};

// Curtain-rise entrance: each token starts fully below its overflow-clipped
// parent and slides up into place at full opacity. Triggered with `animate`
// (not `whileInView`) so it runs on the very first frame after hydrate — the
// IntersectionObserver delay was what hurt LCP, not the opacity tween itself
// (Chrome counts the element from the first frame where opacity > 0, which
// is one rAF after mount ≈ 16ms).
const child = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

export function SplitText({ text, className, by = "word", delay = 0 }: Props) {
  const reduced = usePrefersReducedMotion();
  const tokens = by === "word" ? text.split(" ") : Array.from(text);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <m.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={container}
      custom={delay}
      aria-label={text}
    >
      {tokens.map((tok, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <m.span variants={child} className="inline-block will-change-transform">
            {tok}
            {by === "word" && i < tokens.length - 1 ? " " : ""}
          </m.span>
        </span>
      ))}
    </m.span>
  );
}
