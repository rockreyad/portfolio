import { Eyebrow } from "@/components/primitives/eyebrow";
import { Text } from "@/components/primitives/text";
import { Button } from "@/components/primitives/button";
import { FadeIn } from "@/components/motion/fade-in";

export function AboutTeaser() {
  return (
    <section aria-labelledby="about-title" className="px-[var(--gutter)] py-32 md:py-40">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Eyebrow>About</Eyebrow>
          <Text as="p" variant="small" className="mt-3">
            Mahamud Hasan · the internet calls me <em className="not-italic">rockreyad</em>
          </Text>
        </div>
        <FadeIn className="md:col-span-8">
          <Text as="h2" id="about-title" variant="h2" className="max-w-[22ch]">
            I build cutting-edge web applications focused on great user experience.
          </Text>
          <Text variant="lede" className="mt-8 max-w-[60ch]">
            Software engineer based in Dhaka. At Kaon I work on FlowGPT and Emochi — two AI products
            serving millions of users. On my own I&apos;ve shipped products like LiveSnaps from idea
            to $50K+ in worldwide sales. I care about long-term maintainability, ergonomic APIs, and
            interfaces that respect the person on the other side of the screen.
          </Text>
          <div className="mt-10">
            <Button href="/about" variant="secondary">
              More about me
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
