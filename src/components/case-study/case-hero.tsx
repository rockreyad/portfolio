import Image from "next/image";
import { Eyebrow } from "@/components/primitives/eyebrow";
import type { CaseStudyMeta } from "@/content/work/_schema";

const accentVar = (a: CaseStudyMeta["ogAccent"]) =>
  a === "cobalt"
    ? "var(--color-cobalt)"
    : a === "plum"
      ? "var(--color-plum)"
      : "var(--color-ember)";

export function CaseHero({ meta }: { meta: CaseStudyMeta }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src={meta.cover} alt="" fill priority sizes="100vw" className="object-cover" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--color-bg) 30%, transparent) 0%, color-mix(in oklab, var(--color-bg) 80%, transparent) 60%, var(--color-bg) 100%)",
          }}
        />
      </div>
      <div className="px-[var(--gutter)] pt-32 pb-16 sm:pt-40 sm:pb-20 md:pt-48 md:pb-28">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-6 sm:gap-8">
          <Eyebrow>
            <span
              aria-hidden
              style={{ background: accentVar(meta.ogAccent) }}
              className="size-1.5 rounded-full"
            />
            Case study · {meta.company}
          </Eyebrow>
          <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-tight)] sm:text-[length:var(--text-display)] sm:leading-[var(--leading-display)] sm:tracking-[var(--tracking-display)]">
            {meta.title}
          </h1>
          <p className="max-w-[60ch] text-[length:var(--text-lg)] leading-[var(--leading-body)] text-[var(--color-fg-muted)] sm:text-[length:var(--text-xl)]">
            {meta.oneLiner}
          </p>
        </div>
      </div>
    </section>
  );
}
