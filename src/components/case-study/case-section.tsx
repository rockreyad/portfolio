import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { FadeIn } from "@/components/motion/fade-in";

export function CaseSection({
  eyebrow,
  title,
  children,
  layout = "default",
  className,
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  layout?: "default" | "wide" | "bleed";
  className?: string;
}) {
  return (
    <section
      className={cn(
        "py-16 md:py-24",
        layout === "wide" && "md:-mx-6",
        layout === "bleed" && "px-0",
        className,
      )}
    >
      <FadeIn>
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        {title && (
          <h2 className="mb-8 max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-tight)]">
            {title}
          </h2>
        )}
        <div className="prose-case max-w-[var(--container-prose)]">{children}</div>
      </FadeIn>
    </section>
  );
}
