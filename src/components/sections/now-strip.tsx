import { Eyebrow } from "@/components/primitives/eyebrow";
import { Text } from "@/components/primitives/text";

/**
 * Now strip — current intake, no product recap.
 *
 * Previous copy ("Currently shipping FlowGPT & Emochi at Kaon. Reading
 * slow, writing more.") restated the Hero verbatim and gave the reader
 * zero new information. The Hero already establishes "what I'm building";
 * this section now does the job /now exists for — what's on the *desk*
 * this week. Reading, learning, current attention.
 *
 * Deliberately omits any product mention (FlowGPT / Emochi / Kaon /
 * LiveSnaps / Hisabi) because:
 *   - All of those are already on the page in stronger contexts.
 *   - Hisabi specifically is under active construction and shouldn't be
 *     promoted from the homepage yet.
 */
export function NowStrip() {
  const updated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  return (
    <section aria-labelledby="now-title" className="px-[var(--gutter)] py-24">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>
            <span className="relative inline-flex">
              <span className="absolute inset-0 size-1.5 rounded-full bg-[var(--color-accent)] motion-safe:animate-ping" />
              <span className="relative size-1.5 rounded-full bg-[var(--color-accent)]" />
            </span>
            <span>Now · updated {updated}</span>
          </Eyebrow>
          <Text as="h2" id="now-title" variant="h3" className="mt-4 max-w-[30ch]">
            Re-reading Kleppmann on replication. Tracking the LLM eval space more than I write in
            it.
          </Text>
        </div>
        <Text variant="small">
          <a href="/now" className="text-[var(--color-link)] underline-offset-4 hover:underline">
            Read the full /now →
          </a>
        </Text>
      </div>
    </section>
  );
}
