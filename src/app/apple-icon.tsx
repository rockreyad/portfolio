import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const s = size.width;
  const radius = Math.round(s * 0.22);

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
            fontSize: s * 0.66,
            fontWeight: 700,
            color: "#f4efe6",
            letterSpacing: `${-s * 0.04}px`,
            lineHeight: 1,
            transform: `translate(${-s * 0.06}px, ${-s * 0.02}px)`,
          }}
        >
          m
        </span>
        <div
          style={{
            position: "absolute",
            right: s * 0.18,
            bottom: s * 0.22,
            width: s * 0.14,
            height: s * 0.14,
            background: "#e5462a",
            borderRadius: "50%",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
