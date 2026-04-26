import Image from "next/image";

export function CaseImage({
  src,
  alt,
  caption,
  layout = "inset",
  ratio = "16/10",
}: {
  src: string;
  alt: string;
  caption?: string;
  layout?: "inset" | "bleed";
  ratio?: "16/10" | "16/9" | "4/3" | "1/1";
}) {
  return (
    <figure className={layout === "bleed" ? "-mx-[var(--gutter)] my-12" : "my-10"}>
      <div
        className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-sunken)]"
        style={{ aspectRatio: ratio.replace("/", " / ") }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
