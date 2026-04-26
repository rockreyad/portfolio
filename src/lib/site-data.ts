export type Project = {
  slug: string;
  name: string;
  company: string;
  role: string;
  dates: string;
  oneLiner: string;
  stack: string[];
  url?: string;
  cover: string;
  accent?: "ember" | "cobalt" | "plum";
};

export const SELECTED_WORK: Project[] = [
  {
    slug: "flowgpt",
    name: "FlowGPT",
    company: "Kaon",
    role: "Software Engineer",
    dates: "Jun 2023 — Present",
    oneLiner:
      "Joined as engineer ~#12 at the founding phase. Helped grow FlowGPT from ~1M to 6M users in three months — the AI prompt platform that became Kaon.",
    stack: ["Next.js", "tRPC", "Prisma", "Redis", "BullMQ"],
    url: "https://flowgpt.com",
    cover: "/work/flowgpt-cover.svg",
    accent: "ember",
  },
  {
    slug: "emochi",
    name: "Emochi",
    company: "Kaon",
    role: "Web Full-Stack",
    dates: "2024 — Present",
    oneLiner:
      "Took Emochi from React Native mobile-only to a first-class web surface — on a product with 10M+ Play Store downloads. Web DAU is now approaching mobile DAU.",
    stack: ["React Native Web", "Next.js", "tRPC", "Prisma", "Redis"],
    url: "https://emochi.com",
    cover: "/work/emochi-cover.svg",
    accent: "plum",
  },
  {
    slug: "takenote",
    name: "TakeNote.ai",
    company: "TakeNote · Oxford, UK",
    role: "Founding Engineer · Web",
    dates: "2023 — 2024",
    oneLiner:
      "Founding engineer on an Oxford-based AI meeting-intelligence startup. Took the web product from an empty repo to a launched v1 alongside the LSE / LME ex-CTO co-founder.",
    stack: ["Next.js", "TypeScript", "Prisma", "MySQL", "Tailwind"],
    url: "https://www.takenote.ai",
    cover: "/work/takenote-cover.svg",
    accent: "cobalt",
  },
  {
    slug: "livesnaps",
    name: "LiveSnaps",
    company: "Independent",
    role: "Solo founder + engineer",
    dates: "2021 — 2023",
    oneLiner:
      "Android app to send gallery photos to Snapchat as snaps. Built solo, monetized via subscription, $50K+ in worldwide gross sales before I sunset it.",
    stack: ["Java", "Android", "Firebase", "Stripe"],
    url: "https://github.com/rockreyad/LiveSnaps",
    cover: "/work/livesnaps-cover.svg",
    accent: "ember",
  },
  {
    slug: "blinto",
    name: "Blinto",
    company: "Blinto",
    role: "Full-Stack Developer",
    dates: "May 2023 — Aug 2023",
    oneLiner:
      "First full-time role. Built and shipped a Shopify gift-wrap & gift-options app — Blinto's first-ever Shopify App Store approval.",
    stack: ["Shopify", "Remix", "React", "NestJS", "MongoDB"],
    cover: "/work/blinto-cover.svg",
    accent: "cobalt",
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  author: { name: string; role: string; company?: string; url?: string };
  theme: "engineering" | "ownership" | "product" | "collab" | "problem";
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Hasan consistently demonstrates strong system thinking. While working on complex features, he focuses not only on implementation but also on long-term maintainability and scalability. His ability to break down ambiguous problems into structured solutions is something that stands out.",
    author: { name: "Senior Engineer", role: "FlowGPT" },
    theme: "engineering",
  },
  {
    id: "t2",
    quote:
      "One of Hasan's biggest strengths is ownership. When he takes on a task, he sees it through end-to-end — from understanding the problem to refining the final experience. He's dependable, communicates clearly, and ships with confidence.",
    author: { name: "Tech Lead", role: "Kaon" },
    theme: "ownership",
  },
  {
    id: "t3",
    quote:
      "Hasan doesn't just write code — he thinks in terms of product impact. He often challenges assumptions, suggests better approaches, and keeps the user experience in mind while building technical solutions.",
    author: { name: "Product Manager", role: "" },
    theme: "product",
  },
  {
    id: "t4",
    quote:
      "Working with Hasan has always been smooth. He's thoughtful in discussions, open to feedback, and brings a calm, solution-oriented approach to the team. He elevates the quality of work around him.",
    author: { name: "Frontend Engineer", role: "" },
    theme: "collab",
  },
  {
    id: "t5",
    quote:
      "Hasan has a strong ability to debug and navigate complex issues. Even in unclear situations, he approaches problems methodically and finds practical solutions without overcomplicating things.",
    author: { name: "Engineering Manager", role: "" },
    theme: "problem",
  },
];

export const MARQUEE_LOGOS = [
  "Kaon",
  "FlowGPT",
  "Emochi",
  "TakeNote.ai",
  "LiveSnaps",
  "Blinto",
  "Shopify App Store",
] as const;
