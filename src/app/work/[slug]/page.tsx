import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getAllCaseStudies, getCaseStudy, getAdjacent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { CaseHero } from "@/components/case-study/case-hero";
import { CaseMeta } from "@/components/case-study/case-meta";
import { CaseSection } from "@/components/case-study/case-section";
import { CaseImage } from "@/components/case-study/case-image";
import { CaseQuote } from "@/components/case-study/case-quote";
import { CaseMetrics } from "@/components/case-study/case-metrics";
import { CaseNav } from "@/components/case-study/case-nav";

export const revalidate = 86400;

export async function generateStaticParams() {
  const all = await getAllCaseStudies();
  return all.map((c) => ({ slug: c.meta.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) return {};
  return buildMetadata({
    title: `${cs.meta.title} — Case study`,
    description: cs.meta.oneLiner,
    path: `/work/${slug}`,
  });
}

const mdxComponents = {
  CaseSection,
  CaseImage,
  CaseQuote,
  CaseMetrics,
};

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) notFound();
  const { prev, next } = await getAdjacent(slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: cs.meta.title,
    description: cs.meta.oneLiner,
    author: {
      "@type": "Person",
      name: "Mahamud Hasan",
      url: "https://mrhasan.dev",
    },
    datePublished: new Date(cs.meta.publishedAt).toISOString(),
    dateModified: new Date(cs.meta.updatedAt ?? cs.meta.publishedAt).toISOString(),
    image: cs.meta.cover,
    about: cs.meta.company,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <CaseHero meta={cs.meta} />

      <div className="px-[var(--gutter)] pb-16 sm:pb-20 md:pb-32">
        <div className="mx-auto grid max-w-[var(--container-max)] gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4 md:col-start-1">
            <CaseMeta meta={cs.meta} />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {cs.meta.metrics && <CaseMetrics items={cs.meta.metrics} />}
            <div className="prose-case">
              <MDXRemote source={cs.source} components={mdxComponents} />
            </div>
            <div className="mt-12 rounded-[var(--radius-lg)] border-l-2 border-[var(--color-accent)] bg-[var(--color-bg-sunken)] p-6 sm:mt-16 sm:p-8">
              <p className="text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase">
                Outcome
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] leading-[var(--leading-heading)] sm:text-[length:var(--text-2xl)]">
                {cs.meta.outcome}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[var(--gutter)] pb-20 sm:pb-32">
        <div className="mx-auto max-w-[var(--container-max)]">
          <CaseNav prev={prev} next={next} />
        </div>
      </div>
    </article>
  );
}
