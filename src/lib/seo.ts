import type { Metadata } from "next";

const SITE = {
  name: "Mahamud Hasan",
  url: "https://mrhasan.dev",
  title: "Mahamud Hasan — Software Engineer at Kaon",
  description:
    "Full-stack engineer at Kaon — shipping FlowGPT and Emochi to millions of users. Independent founder who shipped LiveSnaps to $50K+ in worldwide sales. Based in Dhaka.",
  ogImage: "/og/default.png",
  twitter: "@rockreyad",
} as const;

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = SITE.ogImage,
}: SeoInput = {}): Metadata {
  const fullTitle = title ? `${title} — ${SITE.name}` : SITE.title;
  const desc = description ?? SITE.description;
  const url = new URL(path, SITE.url).toString();
  return {
    metadataBase: new URL(SITE.url),
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description: desc,
      siteName: SITE.name,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      creator: SITE.twitter,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  alternateName: "rockreyad",
  url: SITE.url,
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "Kaon" },
  sameAs: [
    "https://github.com/rockreyad",
    "https://www.linkedin.com/in/rockreyad",
    "https://twitter.com/rockreyad",
  ],
  email: "mailto:hasan.jsdev@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
};

export { SITE };
