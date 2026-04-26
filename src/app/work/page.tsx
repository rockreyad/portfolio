import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllCaseStudies } from "@/lib/content";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Text } from "@/components/primitives/text";
import { buildMetadata } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description: "Selected case studies — FlowGPT, Emochi, TakeNote.ai, and more.",
  path: "/work",
});

export default async function WorkIndex() {
  const all = await getAllCaseStudies();
  return (
    <div className="px-[var(--gutter)] pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-[var(--container-max)]">
        <header className="mb-16 max-w-[var(--container-prose)] sm:mb-24">
          <Eyebrow>Work · {all.length} case studies</Eyebrow>
          <Text as="h1" variant="h1" className="mt-6">
            Things I built and what I learned doing it.
          </Text>
        </header>

        <ul className="flex flex-col">
          {all.map((c, i) => (
            <li key={c.meta.slug} className="border-t border-[var(--color-border)] last:border-b">
              <Link
                href={`/work/${c.meta.slug}`}
                className="group grid grid-cols-12 items-center gap-4 py-8 transition-colors hover:bg-[var(--color-bg-sunken)] sm:gap-6 sm:py-10"
              >
                <div className="col-span-2 text-[length:var(--text-sm)] text-[var(--color-fg-subtle)] sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-10 sm:col-span-5 md:col-span-4">
                  <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-tight)] sm:text-[length:var(--text-3xl)]">
                    {c.meta.title}
                  </h2>
                  <p className="mt-1 text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
                    {c.meta.company} · {c.meta.dates}
                  </p>
                </div>
                <div className="col-span-12 text-[length:var(--text-base)] text-[var(--color-fg-muted)] sm:col-span-6 md:col-span-4">
                  {c.meta.oneLiner}
                </div>
                <div className="relative col-span-12 hidden aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-md)] md:col-span-2 md:block">
                  <Image
                    src={c.meta.cover}
                    alt=""
                    fill
                    sizes="200px"
                    className="object-cover transition-transform duration-[var(--duration-hero)] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                </div>
                <div className="col-span-12 hidden items-center justify-end md:col-span-1 md:flex">
                  <ArrowUpRight
                    className="size-5 text-[var(--color-fg-subtle)] transition-all duration-[var(--duration-hover)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--color-accent)]"
                    aria-hidden
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
