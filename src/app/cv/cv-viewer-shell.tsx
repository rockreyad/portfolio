"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const CvViewer = dynamic(() => import("./cv-viewer").then((m) => m.CvViewer), {
  ssr: false,
  loading: () => (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="aspect-[51/66] w-full animate-pulse rounded-[var(--radius-md)] bg-[var(--color-bg-sunken)] ring-1 ring-black/5" />
      <div className="inline-flex items-center gap-2 text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
        <Loader2 className="size-3.5 animate-spin" aria-hidden /> Loading PDF…
      </div>
    </div>
  ),
});

export function CvViewerShell({ src }: { src: string }) {
  return <CvViewer src={src} />;
}
