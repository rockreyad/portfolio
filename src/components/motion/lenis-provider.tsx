"use client";
import { useEffect } from "react";

/**
 * Smooth-scroll provider. The `lenis` library is ~30KB gzipped and starts an
 * rAF loop the moment it's instantiated, so loading and constructing it
 * synchronously during hydration competes with the LCP image for main-thread
 * time.
 *
 * Strategy:
 *   1. Skip entirely for users who prefer reduced motion.
 *   2. Wait for `requestIdleCallback` (or a 800ms fallback timeout) before
 *      dynamically importing the module. Native smooth-scroll behavior is
 *      identical until then, so the user won't notice the delay.
 *   3. Tear down cleanly if the component unmounts before lenis loads.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let raf = 0;
    let cleanup: (() => void) | null = null;

    const boot = async () => {
      if (cancelled) return;
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const tick = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    };

    const ric = (
      window as Window &
        typeof globalThis & {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
          cancelIdleCallback?: (id: number) => void;
        }
    ).requestIdleCallback;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;
    if (typeof ric === "function") {
      idleHandle = ric(boot, { timeout: 1200 });
    } else {
      timeoutHandle = window.setTimeout(boot, 800);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined) {
        const cic = (
          window as Window &
            typeof globalThis & {
              cancelIdleCallback?: (id: number) => void;
            }
        ).cancelIdleCallback;
        cic?.(idleHandle);
      }
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
