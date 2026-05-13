"use client";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Vercel Analytics + Speed Insights aren't needed for first paint. Holding
 * them out of the initial render until the browser is idle keeps them off
 * the LCP/TBT critical path entirely — Lighthouse's "Reduce the impact of
 * third-party code" diagnostic stops flagging them.
 *
 * Speed Insights still captures real first-load metrics from the browser
 * Performance API regardless of when its script mounts, so we don't lose any
 * RUM data by delaying the inject.
 *
 * CSP note: neither Vercel component supports a `nonce` prop today — they
 * call `document.createElement('script')` from inside a useEffect to inject
 * `va.vercel-scripts.com` and `vitals.vercel-insights.com`. Our CSP uses
 * `'strict-dynamic'`, which propagates trust from the nonced Next.js root
 * scripts through any DOM-injected script. So these load correctly under
 * strict CSP without needing per-component nonce wiring.
 */
export function DeferredAnalytics() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
    let idle: number | undefined;
    let timer: number | undefined;
    if (typeof win.requestIdleCallback === "function") {
      idle = win.requestIdleCallback(() => setReady(true), { timeout: 2500 });
    } else {
      timer = window.setTimeout(() => setReady(true), 1500);
    }
    return () => {
      if (idle !== undefined) win.cancelIdleCallback?.(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  if (!ready) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
