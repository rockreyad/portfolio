import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/resume", destination: "/cv", permanent: false },
    ];
  },
  async headers() {
    // Security headers (CSP, HSTS, COOP, XFO, COEP-equivalent, Permissions
    // Policy, Trusted Types) are set in `src/proxy.ts` so they can include
    // the per-request CSP nonce. This `headers()` block only owns header
    // policy for paths the proxy deliberately skips — namely static asset
    // routes that need long-lived caching but don't render HTML.
    return [
      {
        source: "/fonts/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        ],
      },
      {
        source: "/textures/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default config;
