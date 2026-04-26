import type { Metadata } from "next";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Text } from "@/components/primitives/text";
import { Signature } from "@/components/primitives/signature";
import { TESTIMONIALS } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "About Mahamud Hasan — software engineer based in Dhaka.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="px-[var(--gutter)] pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-12 sm:gap-16 md:grid-cols-12">
        <header className="md:col-span-12">
          <Eyebrow>About</Eyebrow>
          <Text as="h1" variant="h1" className="mt-6 max-w-[20ch]">
            Software engineer who treats the web like a craft.
          </Text>
          <div className="mt-10 flex items-center gap-6">
            <Signature
              size="lg"
              label="Mahamud Hasan signature"
              className="text-[var(--color-fg)]"
            />
            <span className="hidden text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase md:inline">
              — Mahamud Hasan
            </span>
          </div>
        </header>

        <section className="md:col-span-7 md:col-start-1">
          <Text variant="lede" className="max-w-[60ch]">
            I&apos;m Mahamud Hasan — the internet calls me <em className="not-italic">rockreyad</em>
            . I build cutting-edge web applications focused on great user experience. At{" "}
            <strong>Kaon</strong> I&apos;m a full-stack engineer working on <strong>FlowGPT</strong>{" "}
            (Kaon&apos;s first product) and <strong>Emochi</strong> (Kaon&apos;s second).
          </Text>
          <Text variant="body" className="mt-6 max-w-[60ch] text-[var(--color-fg-muted)]">
            On my own, I&apos;ve shipped end-to-end products as a solo founder — most notably{" "}
            <strong>LiveSnaps</strong>, an Android app that generated{" "}
            <strong>$50K+ in worldwide gross sales</strong> before I sunset it on my own terms. I
            helped take <strong>TakeNote.ai</strong> from an empty repo to a working product as one
            of three founding engineers, and at my first full-time role at <strong>Blinto</strong> I
            shipped the company&apos;s first-ever Shopify App Store approval.
          </Text>
          <Text variant="body" className="mt-6 max-w-[60ch] text-[var(--color-fg-muted)]">
            I care about long-term maintainability over short-term cleverness, ergonomic APIs, and
            interfaces that respect the person on the other side of the screen.
          </Text>
        </section>

        <aside className="md:col-span-4 md:col-start-9">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
            <Eyebrow>Quick facts</Eyebrow>
            <ul className="mt-4 flex flex-col gap-3 text-[length:var(--text-sm)]">
              <li>
                <span className="text-[var(--color-fg-muted)]">Location · </span>
                Dhaka, Bangladesh
              </li>
              <li>
                <span className="text-[var(--color-fg-muted)]">Currently · </span>
                Software Engineer at Kaon
              </li>
              <li>
                <span className="text-[var(--color-fg-muted)]">On · </span>
                FlowGPT &amp; Emochi
              </li>
              <li>
                <span className="text-[var(--color-fg-muted)]">Open to · </span>
                Select consulting / collaboration
              </li>
              <li>
                <span className="text-[var(--color-fg-muted)]">Email · </span>
                <a
                  href="mailto:hasan.jsdev@gmail.com"
                  className="text-[var(--color-link)] underline-offset-4 hover:underline"
                >
                  hasan.jsdev@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <section className="mt-12 md:col-span-12">
          <Eyebrow>Words from the team</Eyebrow>
          <Text as="h2" variant="h3" className="mt-4 max-w-[24ch]">
            Five collaborators, five angles.
          </Text>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <li
                key={t.id}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8"
              >
                <blockquote className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] leading-[var(--leading-body)]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-[length:var(--text-sm)]">
                  <span className="text-[var(--color-fg)]">{t.author.name}</span>
                  {t.author.role && (
                    <span className="text-[var(--color-fg-muted)]"> · {t.author.role}</span>
                  )}
                </figcaption>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
