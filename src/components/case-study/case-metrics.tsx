"use client";
import { m, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Metric = { label: string; value: string; sub?: string };

/** True when the value contains a counted-up-able number. */
function isNumericMetric(value: string): boolean {
  // Must contain at least one digit to be animatable.
  // "$50K+" → yes (50). "Global" → no. "Sunset" → no. "4 mo" → yes (4).
  return /\d/.test(value);
}

function NumericValue({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduced = usePrefersReducedMotion();
  const numeric = Number(metric.value.replace(/[^\d.-]/g, ""));
  const prefix = metric.value.match(/^[^\d-]+/)?.[0] ?? "";
  const suffix = metric.value.match(/[^\d.]+$/)?.[0] ?? "";
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (!inView || reduced || Number.isNaN(numeric)) return;
    const ctrl = animate(mv, numeric, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => ctrl.stop();
  }, [inView, reduced, numeric, mv]);

  if (Number.isNaN(numeric) || reduced) {
    return <span ref={ref}>{metric.value}</span>;
  }
  return (
    <span ref={ref}>
      <m.span>{display}</m.span>
    </span>
  );
}

function StaticValue({ metric }: { metric: Metric }) {
  return <span>{metric.value}</span>;
}

function MetricCell({ metric }: { metric: Metric }) {
  const Inner = isNumericMetric(metric.value) ? NumericValue : StaticValue;
  return (
    <div className="flex flex-col gap-2 border-t border-[var(--color-border)] pt-6">
      <span className="font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] leading-none tracking-[var(--tracking-tight)] text-[var(--color-accent)]">
        <Inner metric={metric} />
      </span>
      <span className="text-[length:var(--text-sm)] text-[var(--color-fg)]">{metric.label}</span>
      {metric.sub && (
        <span className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
          {metric.sub}
        </span>
      )}
    </div>
  );
}

export function CaseMetrics({ items }: { items: Metric[] }) {
  if (!items?.length) return null;
  return (
    <div className="my-16 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
      {items.map((it) => (
        <MetricCell key={it.label} metric={it} />
      ))}
    </div>
  );
}
