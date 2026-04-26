import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Mahamud Hasan";
  const subtitle = searchParams.get("subtitle") ?? "Software Engineer at Kaon";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#f4efe6",
        color: "#0b0b0f",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          fontSize: 28,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        mrhasan.dev
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 96, lineHeight: 1, letterSpacing: "-0.04em" }}>{title}</div>
        <div style={{ fontSize: 36, color: "#6a6458", marginTop: 24 }}>{subtitle}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span>Dhaka, BD</span>
        <span style={{ color: "#e5462a" }}>rockreyad</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
