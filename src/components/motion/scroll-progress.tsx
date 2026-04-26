"use client";
import { m, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <m.div
      aria-hidden
      style={{ scaleX: x, transformOrigin: "0 0" }}
      className="fixed top-0 right-0 left-0 z-[60] h-[2px] bg-[var(--color-accent)]"
    />
  );
}
