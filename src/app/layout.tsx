import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { DeferredAnalytics } from "@/components/chrome/deferred-analytics";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MotionProvider } from "@/components/motion/motion-provider";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { Header } from "@/components/chrome/header";
import { Footer } from "@/components/chrome/footer";
import { SkipLink } from "@/components/chrome/skip-link";
import { GrainOverlay } from "@/components/chrome/grain-overlay";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { buildMetadata, personJsonLd } from "@/lib/seo";
import "./globals.css";

// Body + UI + hero name. Variable upright covers the full weight range used on
// the site (300–900). Italics are never rendered (we only use `not-italic` em
// overrides and a Monaspace `slnt` utility), so the 44KB italic file is dropped.
// adjustFontFallback='Arial' tells Next.js to generate size-adjust/ascent/descent
// override metrics so the system fallback paints with near-identical box
// dimensions to Satoshi — eliminates the CLS spike on font swap.
const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi/Satoshi-Variable.woff2",
      style: "normal",
      weight: "300 900",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});

// Editorial display serif. Only Demi (600) and Bold (700) are actually used by
// `font-display` headings/heros — Light (300) and Regular (400) were shipped
// but never referenced; dropping them saves ~70KB on every page load.
// 'Times New Roman' is the right metric-match anchor for a serif display face.
const lovato = localFont({
  src: [
    {
      path: "../../public/fonts/Lovato/Lovato-Demi.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Lovato/Lovato-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// Mono carries a lot of the site's design language — eyebrows, dates, stack
// pills, scroll cue. Every visitor needs to see Krypton, so display:'swap'
// guarantees it always renders once downloaded. preload:false keeps the
// 445KB variable file off the LCP critical path; it arrives after the hero
// image and swaps in. The fallback (ui-monospace / SF Mono / Menlo) is also
// monospace, so the swap CLS is negligible — character cells stay aligned.
const monaspaceKrypton = localFont({
  src: "../../public/fonts/Monaspace Krypton/Monaspace Krypton Var.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "200 800",
  preload: false,
  adjustFontFallback: false,
});

// One-off ornamental accent on "rockreyad" — the brand moment. The file is
// tiny (~7KB) so preload:false just keeps it off the critical-path race with
// the LCP image; display:'swap' guarantees the real face renders for every
// visitor once it arrives, instead of being skipped on slow first loads the
// way display:'optional' would.
const kalmansk = localFont({
  src: "../../public/fonts/Kalmansk/Kalmansk Regular.woff2",
  variable: "--font-accent",
  display: "swap",
  weight: "400",
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Trusted Types default policy bootstrap.
// Our CSP sets `require-trusted-types-for 'script'`, which causes the browser
// to reject DOM-XSS sinks (innerHTML, document.write, etc.) unless the value
// passes through a TT policy. React 19's renderer uses sinks; without a
// default policy the app would throw on hydration. The no-op policy below
// passes strings through unchanged — it satisfies the CSP directive (and the
// Lighthouse audit) without changing runtime behavior. The portfolio has zero
// user input so there is no real sanitization concern.
const TRUSTED_TYPES_BOOTSTRAP = `if(window.trustedTypes&&window.trustedTypes.createPolicy){try{window.trustedTypes.createPolicy('default',{createHTML:function(s){return s},createScript:function(s){return s},createScriptURL:function(s){return s}})}catch(e){}}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${satoshi.variable} ${lovato.variable} ${monaspaceKrypton.variable} ${kalmansk.variable}`}
    >
      <head>
        {/* Must run before any other script so React's hydration succeeds
            under the require-trusted-types-for CSP directive. */}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: TRUSTED_TYPES_BOOTSTRAP }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider nonce={nonce}>
          <MotionProvider>
            <LenisProvider>
              <SkipLink />
              <ScrollProgress />
              <GrainOverlay />
              <Header />
              <main id="main" className="relative">
                {children}
              </main>
              <Footer />
            </LenisProvider>
          </MotionProvider>
        </ThemeProvider>
        <DeferredAnalytics />
      </body>
    </html>
  );
}
