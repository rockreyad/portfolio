import type { Metadata } from "next";
import { HeroDisplay } from "@/components/sections/hero/hero-display";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { SelectedWork } from "@/components/sections/selected-work";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { NowStrip } from "@/components/sections/now-strip";
import { ContactBlock } from "@/components/sections/contact-block";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata();

export default function HomePage() {
  return (
    <>
      <HeroDisplay />
      <MarqueeStrip />
      <SelectedWork />
      <AboutTeaser />
      <Testimonials />
      <NowStrip />
      <ContactBlock />
    </>
  );
}
