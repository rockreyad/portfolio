import { SELECTED_WORK } from "@/lib/site-data";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Text } from "@/components/primitives/text";
import { Button } from "@/components/primitives/button";
import { WorkRow } from "./work-row";

export function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="px-[var(--gutter)] py-24 sm:py-32 md:py-48"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        <header className="mb-12 flex flex-col gap-6 sm:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3 sm:gap-4">
            <Eyebrow>Selected work · 2021 — Now</Eyebrow>
            <Text as="h2" variant="h2" id="work-title" className="max-w-[18ch]">
              Five projects, one through-line:{" "}
              <em className="text-[var(--color-accent)] not-italic">ship the user experience.</em>
            </Text>
          </div>
          <Button href="/work" variant="ghost">
            All work →
          </Button>
        </header>

        <ul className="flex flex-col">
          {SELECTED_WORK.map((p, i) => (
            <WorkRow key={p.slug} project={p} idx={i} total={SELECTED_WORK.length} />
          ))}
        </ul>
      </div>
    </section>
  );
}
