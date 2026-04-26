import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Text } from "@/components/primitives/text";
import { Button } from "@/components/primitives/button";
import { FadeIn } from "@/components/motion/fade-in";
import { buildMetadata } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Now",
  description:
    "What I'm working on, what I'm building on the side, what I'm learning, and how to reach me right now.",
  path: "/now",
});

const UPDATED = "April 2026";

/**
 * /now — a Sivers-style status page, written as a letter to someone
 * considering reaching out. Four jobs:
 *   1. Anchor with a real, dated paragraph (not a status dashboard)
 *   2. Show what's on the desk this week (Kaon work)
 *   3. Show what's on the side burner (Hisabi)
 *   4. Show what's being learned, what's being read, and how to engage
 */
export default function NowPage() {
  return (
    <div className="px-[var(--gutter)] pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-[var(--container-max)]">
        {/* HEADER */}
        <header className="mb-16 max-w-[var(--container-prose)] sm:mb-24">
          <Eyebrow>
            <span className="relative inline-flex">
              <span className="absolute inset-0 size-1.5 rounded-full bg-[var(--color-accent)] motion-safe:animate-ping" />
              <span className="relative size-1.5 rounded-full bg-[var(--color-accent)]" />
            </span>
            <span>Now · updated {UPDATED}</span>
          </Eyebrow>
          <Text as="h1" variant="h1" className="mt-6 max-w-[18ch]">
            What I&apos;m working on, right now.
          </Text>
          <Text variant="lede" className="mt-8 max-w-[60ch]">
            This page is a snapshot — what&apos;s on my desk this week, what&apos;s on my side
            burner, what I&apos;m learning, and how to reach me if something here resonates.
            Inspired by{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-link)] underline-offset-4 hover:underline"
            >
              Derek Sivers&apos; /now movement
            </a>
            .
          </Text>
        </header>

        {/* DAY JOB */}
        <FadeIn>
          <section
            aria-labelledby="now-work"
            className="mb-20 grid gap-8 border-t border-[var(--color-border)] pt-12 sm:mb-28 sm:pt-16 md:grid-cols-12"
          >
            <header className="md:col-span-4">
              <Eyebrow>01 · Day job</Eyebrow>
              <h2
                id="now-work"
                className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-tight)]"
              >
                Shipping at Kaon.
              </h2>
            </header>
            <div className="prose-case md:col-span-7 md:col-start-6">
              <p>
                Full-stack engineer at <strong>Kaon</strong>, the parent company behind{" "}
                <strong>FlowGPT</strong> and <strong>Emochi</strong>. Most of my week goes into
                product features that touch real users — schema, API, UI, telemetry, the whole loop.
                Some weeks that&apos;s a marketplace surface on FlowGPT, some weeks it&apos;s a
                conversational flow on Emochi.
              </p>
              <p>
                What I care about right now: shipping things that <em>stay shipped</em> — features
                that don&apos;t show up in next week&apos;s incident channel, written so the next
                engineer can read them without asking me a question.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* SIDE PROJECT — HISABI (the headline) */}
        <FadeIn>
          <section aria-labelledby="now-hisabi" className="mb-20 sm:mb-28">
            <div
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 sm:p-12"
              style={{
                boxShadow:
                  "0 1px 0 color-mix(in oklab, var(--color-accent) 8%, transparent), 0 24px 64px -32px color-mix(in oklab, var(--color-accent) 35%, transparent)",
              }}
            >
              <div className="grid gap-8 md:grid-cols-12">
                <header className="md:col-span-5">
                  <Eyebrow>02 · On the side</Eyebrow>
                  <h2
                    id="now-hisabi"
                    className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] leading-[0.95] tracking-[var(--tracking-display)] sm:text-[length:var(--text-5xl)]"
                  >
                    <span className="block">Hisabi.</span>
                    <span className="mt-2 block text-[length:var(--text-base)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase sm:text-[length:var(--text-sm)]">
                      Simple, smart, shared finance
                    </span>
                  </h2>
                </header>

                <div className="md:col-span-7">
                  <Text variant="lede" className="text-[var(--color-fg)]">
                    A modern, mobile-first finance tracker built for everyday people in Bangladesh —
                    from a chaiwala tracking daily purchases to a professional splitting bills with
                    colleagues.
                  </Text>

                  <p className="mt-6 text-[length:var(--text-base)] leading-[var(--leading-body)] text-[var(--color-fg-muted)]">
                    Hisabi tracks personal expenses, shared meals, rent, and everything in between —
                    even when the other person isn&apos;t using the app. Net balances stay visible;
                    lend / borrow entries disappear. Built offline-first because the use case
                    demands it: you&apos;re tracking a purchase from a shopkeeper who doesn&apos;t
                    carry a smartphone.
                  </p>

                  {/* Pillar list */}
                  <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                    {[
                      ["Offline-first", "designed for spotty connectivity"],
                      ["Local-first UX", "names + phone numbers, not accounts"],
                      ["Net balances", "no manual lend / borrow entries"],
                      ["Real use cases", "shopkeepers, splits, rent, daily life"],
                    ].map(([title, sub]) => (
                      <li key={title} className="flex flex-col gap-0.5">
                        <span className="text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">
                          <span aria-hidden className="mr-2 text-[var(--color-accent)]">
                            ·
                          </span>
                          {title}
                        </span>
                        <span className="ml-3 text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
                          {sub}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[var(--color-border)] pt-6">
                    <span className="rounded-[var(--radius-pill)] bg-[var(--color-accent)]/12 px-3 py-1 text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-accent)] uppercase">
                      Status · Active build
                    </span>
                    <span className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
                      Tracking design + alpha · Bangladesh-first
                    </span>
                    <a
                      href="mailto:hasan.jsdev@gmail.com?subject=Hisabi%20%E2%80%94%20I%27d%20like%20to%20chat"
                      className="ml-auto inline-flex items-center gap-1.5 text-[length:var(--text-sm)] text-[var(--color-link)] underline-offset-4 hover:underline"
                    >
                      Want early access? Email me
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* LEARNING */}
        <FadeIn>
          <section
            aria-labelledby="now-learning"
            className="mb-20 grid gap-8 border-t border-[var(--color-border)] pt-12 sm:mb-28 sm:pt-16 md:grid-cols-12"
          >
            <header className="md:col-span-4">
              <Eyebrow>03 · Learning</Eyebrow>
              <h2
                id="now-learning"
                className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-tight)]"
              >
                Sharpening, not switching.
              </h2>
            </header>
            <div className="md:col-span-7 md:col-start-6">
              <ul className="flex flex-col divide-y divide-[var(--color-border)]">
                {[
                  {
                    label: "Prompt engineering",
                    detail:
                      "Less generic 'be helpful' framing, more structured contracts — system / role / few-shot / output schema. Useful in a Kaon stack and useful for everything I build with LLMs on the side.",
                  },
                  {
                    label: "AI tooling for shipped product",
                    detail:
                      "Where AI replaces a real surface vs. where it just adds latency. Cursor, Claude Code, evals, retrieval — anything that earns its place in a production loop.",
                  },
                  {
                    label: "Mobile-first product design",
                    detail:
                      "Hisabi is forcing me to think about offline state, conflict resolution, and the kinds of UX my desktop-engineering instincts don't reach.",
                  },
                ].map((it) => (
                  <li key={it.label} className="grid grid-cols-12 gap-4 py-5 first:pt-0">
                    <span className="col-span-12 text-[length:var(--text-base)] font-medium text-[var(--color-fg)] sm:col-span-4">
                      {it.label}
                    </span>
                    <span className="col-span-12 text-[length:var(--text-sm)] text-[var(--color-fg-muted)] sm:col-span-8">
                      {it.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeIn>

        {/* INTAKE / READING / WATCHING */}
        <FadeIn>
          <section
            aria-labelledby="now-intake"
            className="mb-20 grid gap-8 border-t border-[var(--color-border)] pt-12 sm:mb-28 sm:pt-16 md:grid-cols-12"
          >
            <header className="md:col-span-4">
              <Eyebrow>04 · Intake</Eyebrow>
              <h2
                id="now-intake"
                className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-tight)]"
              >
                Reading, watching, listening.
              </h2>
            </header>
            <div className="md:col-span-7 md:col-start-6">
              <dl className="flex flex-col divide-y divide-[var(--color-border)]">
                <IntakeRow
                  label="Following"
                  primary="The frontier-LLM eval space"
                  secondary="Anthropic / OpenAI / DeepMind release notes — what shipped, what was claimed, what actually held up."
                />
                <IntakeRow
                  label="Re-reading"
                  primary="Designing Data-Intensive Applications — Kleppmann"
                  secondary="One chapter at a time. Currently on replication. Holds up better than 90% of what was published this year."
                />
                <IntakeRow
                  label="Studying"
                  primary="Editorial sites that aren't tech portfolios"
                  secondary="The Browser Company, Read Max, A Working Library — for the rhythm and density that templates never reach."
                />
                <IntakeRow
                  label="Listening"
                  primary="Lo-fi instrumentals for ship days"
                  secondary="Lyrics-while-coding is a tax I stopped paying. The Anthropic + Latent Space podcast for commute days."
                />
              </dl>
            </div>
          </section>
        </FadeIn>

        {/* OPEN TO / NOT OPEN TO */}
        <FadeIn>
          <section
            aria-labelledby="now-availability"
            className="mb-20 grid gap-8 border-t border-[var(--color-border)] pt-12 sm:mb-28 sm:pt-16 md:grid-cols-12"
          >
            <header className="md:col-span-4">
              <Eyebrow>05 · Availability</Eyebrow>
              <h2
                id="now-availability"
                className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-tight)]"
              >
                What I&apos;m saying yes &amp; no to.
              </h2>
            </header>
            <div className="grid gap-6 sm:grid-cols-2 md:col-span-7 md:col-start-6">
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
                <p className="text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-accent)] uppercase">
                  Open to
                </p>
                <ul className="mt-4 flex flex-col gap-3 text-[length:var(--text-sm)] leading-[var(--leading-body)]">
                  <li>Senior / staff full-stack roles in serious AI product teams</li>
                  <li>Consulting on Shopify App Store, AI product launches, or onboarding flows</li>
                  <li>Design partners or testers for Hisabi&apos;s alpha</li>
                  <li>Coffee in Dhaka with engineers / founders / designers</li>
                </ul>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
                <p className="text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase">
                  Not right now
                </p>
                <ul className="mt-4 flex flex-col gap-3 text-[length:var(--text-sm)] leading-[var(--leading-body)] text-[var(--color-fg-muted)]">
                  <li>Unpaid &quot;build my idea&quot; requests</li>
                  <li>Crypto / NFT / pump-and-dump-shaped projects</li>
                  <li>Recruiter spam without a role attached</li>
                </ul>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* CTA STRIP */}
        <FadeIn>
          <section
            aria-labelledby="now-engage"
            className="border-t border-[var(--color-border)] pt-12 sm:pt-16"
          >
            <header className="mb-10">
              <Eyebrow>06 · Engage</Eyebrow>
              <h2
                id="now-engage"
                className="mt-3 max-w-[26ch] font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-tight)] sm:text-[length:var(--text-4xl)]"
              >
                Three doors. Pick one.
              </h2>
            </header>

            <div className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-border)] md:grid-cols-3">
              <EngageDoor
                kicker="For recruiters"
                title="Senior / staff roles"
                body="If your team is shipping AI product to real users and needs a full-stack engineer who can own the loop end to end."
                href="mailto:hasan.jsdev@gmail.com?subject=Senior%20engineering%20opportunity"
                cta="Email about a role"
              />
              <EngageDoor
                kicker="For founders + teams"
                title="Consulting"
                body="Short engagements only. Shopify app launches, AI surfaces, product onboarding. Time-boxed, scoped before we start."
                href="mailto:hasan.jsdev@gmail.com?subject=Consulting%20enquiry"
                cta="Email about consulting"
              />
              <EngageDoor
                kicker="For Hisabi users"
                title="Alpha access"
                body="If you'd actually use a Bangladesh-first finance tracker — personal, shared, or shopkeeper-style — I want you on the alpha list."
                href="mailto:hasan.jsdev@gmail.com?subject=Hisabi%20%E2%80%94%20alpha%20access"
                cta="Join the alpha"
              />
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Button href="/work" variant="secondary">
                See the work →
              </Button>
              <Button href="/about" variant="ghost">
                More about me
              </Button>
              <Link
                href="/cv"
                className="inline-flex items-center gap-1.5 text-[length:var(--text-sm)] text-[var(--color-fg-muted)] underline-offset-4 hover:text-[var(--color-fg)] hover:underline"
              >
                Resume (PDF) ↗
              </Link>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}

function IntakeRow({
  label,
  primary,
  secondary,
}: {
  label: string;
  primary: string;
  secondary: string;
}) {
  return (
    <div className="grid grid-cols-12 gap-3 py-5 first:pt-0">
      <dt className="col-span-12 text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase sm:col-span-3">
        {label}
      </dt>
      <dd className="col-span-12 sm:col-span-9">
        <span className="block text-[length:var(--text-base)] text-[var(--color-fg)]">
          {primary}
        </span>
        <span className="mt-1 block text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
          {secondary}
        </span>
      </dd>
    </div>
  );
}

function EngageDoor({
  kicker,
  title,
  body,
  href,
  cta,
}: {
  kicker: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col gap-4 bg-[var(--color-bg-elevated)] p-8 transition-colors hover:bg-[var(--color-bg-sunken)]"
    >
      <span className="text-[length:var(--text-xs)] tracking-[var(--tracking-eyebrow)] text-[var(--color-fg-muted)] uppercase">
        {kicker}
      </span>
      <span className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-tight)]">
        {title}
      </span>
      <span className="text-[length:var(--text-sm)] leading-[var(--leading-body)] text-[var(--color-fg-muted)]">
        {body}
      </span>
      <span className="mt-auto inline-flex items-center gap-1.5 text-[length:var(--text-sm)] text-[var(--color-link)]">
        {cta}
        <ArrowUpRight
          className="size-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden
        />
      </span>
    </a>
  );
}
