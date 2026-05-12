"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2, RefreshCw } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Worker is copied into public/ by scripts/copy-pdfjs-worker.mjs (runs on
// postinstall) so its version stays locked to react-pdf's pinned pdfjs-dist.
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

type State =
  | { kind: "loading" }
  | { kind: "loaded"; pages: number }
  | { kind: "error"; message: string };

type Props = {
  src: string;
  onPagesLoaded?: (n: number) => void;
};

export function CvViewer({ src, onPagesLoaded }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setWidth(Math.floor(w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <Document
        file={src}
        onLoadSuccess={({ numPages }) => {
          setState({ kind: "loaded", pages: numPages });
          onPagesLoaded?.(numPages);
        }}
        onLoadError={(err) => {
          setState({ kind: "error", message: err.message || "Failed to load PDF" });
        }}
        loading={<ViewerSkeleton />}
        error={null}
        noData={null}
        className="contents"
      >
        {state.kind === "loaded" && width !== null && (
          <ol className="m-0 flex list-none flex-col gap-6 p-0 sm:gap-8">
            {Array.from({ length: state.pages }, (_, i) => (
              <li
                key={i}
                className="group relative isolate overflow-hidden rounded-[var(--radius-md)] bg-white ring-1 ring-black/5 shadow-[0_1px_0_rgb(0_0_0/0.04),0_30px_60px_-20px_rgb(0_0_0/0.25)] transition-shadow duration-[var(--duration-section)] ease-[var(--ease-out-expo)] hover:shadow-[0_1px_0_rgb(0_0_0/0.04),0_40px_80px_-20px_rgb(0_0_0/0.32)]"
              >
                <Page
                  pageNumber={i + 1}
                  width={width}
                  renderTextLayer
                  renderAnnotationLayer
                  loading={
                    <div
                      className="aspect-[51/66] w-full animate-pulse bg-[var(--color-bg-sunken)]"
                      style={{ width }}
                    />
                  }
                  error={
                    <div className="p-8 text-center text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
                      Couldn&apos;t render page {i + 1}.
                    </div>
                  }
                  className="!block"
                />
                {state.pages > 1 && (
                  <span className="absolute right-3 bottom-3 z-10 rounded-[var(--radius-pill)] bg-black/55 px-2.5 py-1 text-[length:var(--text-xs)] font-medium text-white backdrop-blur">
                    {i + 1} / {state.pages}
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}

        {state.kind === "error" && <ViewerError message={state.message} src={src} />}
      </Document>
    </div>
  );
}

function ViewerSkeleton() {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="aspect-[51/66] w-full animate-pulse rounded-[var(--radius-md)] bg-[var(--color-bg-sunken)] ring-1 ring-black/5" />
      <div className="inline-flex items-center gap-2 text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
        <Loader2 className="size-3.5 animate-spin" aria-hidden /> Loading PDF…
      </div>
    </div>
  );
}

function ViewerError({ message, src }: { message: string; src: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-sunken)] p-8 text-center">
      <p className="text-[length:var(--text-base)] font-medium text-[var(--color-fg)]">
        Couldn&apos;t render the PDF
      </p>
      <p className="mt-1 max-w-md mx-auto text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
        {message}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] px-4 text-[length:var(--text-sm)] font-medium text-[var(--color-fg)] hover:bg-[var(--color-bg)]"
        >
          <RefreshCw className="size-4" aria-hidden /> Reload
        </button>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-4 text-[length:var(--text-sm)] font-medium text-[var(--color-accent-fg)] hover:brightness-105"
        >
          Open PDF directly
        </a>
      </div>
    </div>
  );
}
