import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MotionProvider } from "@/components/motion/motion-provider";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { Header } from "@/components/chrome/header";
import { Footer } from "@/components/chrome/footer";
import { SkipLink } from "@/components/chrome/skip-link";
import { GrainOverlay } from "@/components/chrome/grain-overlay";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { CommandPalette } from "@/components/chrome/command-palette";
import { buildMetadata, personJsonLd } from "@/lib/seo";
import "./globals.css";

// Body + UI + hero name. Variable file = full weight range + true italics.
const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi/Satoshi-Variable.woff2",
      style: "normal",
      weight: "300 900",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-VariableItalic.woff2",
      style: "italic",
      weight: "300 900",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

// Editorial display serif for section headlines, project titles, case studies.
const lovato = localFont({
  src: [
    {
      path: "../../public/fonts/Lovato/Lovato-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Lovato/Lovato-Regular.woff2",
      weight: "400",
      style: "normal",
    },
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
});

const monaspaceKrypton = localFont({
  src: "../../public/fonts/Monaspace Krypton/Monaspace Krypton Var.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "200 800",
});

const kalmansk = localFont({
  src: "../../public/fonts/Kalmansk/Kalmansk Regular.woff2",
  variable: "--font-accent",
  display: "swap",
  weight: "400",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${satoshi.variable} ${lovato.variable} ${monaspaceKrypton.variable} ${kalmansk.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
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
              <CommandPalette />
            </LenisProvider>
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
