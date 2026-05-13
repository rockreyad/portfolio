"use client";
import { ThemeProvider as NextThemes } from "next-themes";

export function ThemeProvider({
  children,
  nonce,
}: {
  children: React.ReactNode;
  /**
   * Per-request CSP nonce. Forwarded to next-themes so its FOUC-prevention
   * inline `<script>` is allowed under our strict CSP.
   */
  nonce?: string;
}) {
  return (
    <NextThemes
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      themes={["light", "dark", "hc"]}
      disableTransitionOnChange
      nonce={nonce}
    >
      {children}
    </NextThemes>
  );
}
