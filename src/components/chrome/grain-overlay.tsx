export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.05] mix-blend-overlay"
      style={{
        backgroundImage: "var(--noise)",
        backgroundSize: "180px 180px",
      }}
    />
  );
}
