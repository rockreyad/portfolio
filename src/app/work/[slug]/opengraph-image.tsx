import { ImageResponse } from "next/og";
import { getCaseStudy } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study cover";

const ACCENT: Record<string, string> = {
  ember: "#E5462A",
  cobalt: "#1B5BFF",
  plum: "#1A0F2E",
};

export default async function OgImage({ params }: { params: { slug: string } }) {
  const cs = await getCaseStudy(params.slug);
  if (!cs) {
    return new ImageResponse(<div style={{ background: "#f4efe6" }} />, size);
  }
  const accent = ACCENT[cs.meta.ogAccent] ?? ACCENT.ember;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#F4EFE6",
        color: "#0B0B0F",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        <span>Case study · {cs.meta.company}</span>
        <span style={{ color: accent }}>mrhasan.dev</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 108, lineHeight: 1, letterSpacing: "-0.04em" }}>
          {cs.meta.title}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#6A6458",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          {cs.meta.oneLiner}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
        }}
      >
        <span>
          {cs.meta.role} · {cs.meta.dates}
        </span>
        <span style={{ color: accent }}>{cs.meta.stack.slice(0, 3).join(" · ")}</span>
      </div>
    </div>,
    size,
  );
}
