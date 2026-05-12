import { ImageResponse } from "next/og";

export const contentType = "image/png";

export function generateImageMetadata() {
  return [
    { id: "32", size: { width: 32, height: 32 }, contentType: "image/png" },
    { id: "192", size: { width: 192, height: 192 }, contentType: "image/png" },
    { id: "512", size: { width: 512, height: 512 }, contentType: "image/png" },
  ];
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const resolved = await id;
  const size = Number(resolved) || 32;
  const radius = Math.round(size * 0.22);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0b0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderRadius: radius,
        }}
      >
        <span
          style={{
            fontFamily: "serif",
            fontSize: size * 0.66,
            fontWeight: 700,
            color: "#f4efe6",
            letterSpacing: `${-size * 0.04}px`,
            lineHeight: 1,
            transform: `translate(${-size * 0.06}px, ${-size * 0.02}px)`,
          }}
        >
          m
        </span>
        <div
          style={{
            position: "absolute",
            right: size * 0.18,
            bottom: size * 0.22,
            width: size * 0.14,
            height: size * 0.14,
            background: "#e5462a",
            borderRadius: "50%",
          }}
        />
      </div>
    ),
    { width: size, height: size },
  );
}
