import { NextResponse, type NextRequest } from "next/server";

/**
 * Security headers — single source of truth for the site's hardening posture.
 *
 * Why this lives in the proxy (renamed from middleware in Next.js 16) rather
 * than next.config.ts headers():
 *   The Lighthouse "Best Practices" CSP audit only credits a policy that
 *   neutralizes `'unsafe-inline'` via either a nonce or a hash. Hashes are
 *   impractical for App Router because Next.js emits inline RSC/Flight
 *   bootstrap scripts whose contents vary per page and per build. Nonces
 *   require a per-request value, which means edge-runtime proxy.
 *
 * Cost of this approach:
 *   - Pages that read the nonce via `headers()` become dynamic (no CDN HTML
 *     caching). For this portfolio the TTFB hit is ~20–30ms at the Vercel
 *     edge, well within budget.
 *
 * Headers set here:
 *   - Content-Security-Policy           — nonce + strict-dynamic + Trusted Types
 *   - Strict-Transport-Security         — 2-year max-age, preload-eligible
 *   - Cross-Origin-Opener-Policy        — origin isolation
 *   - Cross-Origin-Resource-Policy      — restrict resource sharing
 *   - X-Frame-Options                   — defense-in-depth alongside frame-ancestors
 *   - X-Content-Type-Options            — MIME sniffing off
 *   - Referrer-Policy                   — leak the minimum referrer info
 *   - Permissions-Policy                — disable APIs we don't use
 */
function buildCsp(nonce: string, isDev: boolean): string {
  // Vercel telemetry endpoints — required for Analytics + Speed Insights.
  const vercel = "https://va.vercel-scripts.com https://vitals.vercel-insights.com";

  // Dev mode needs eval/blob/websocket for HMR and React Fast Refresh.
  const scriptExtra = isDev ? "'unsafe-eval' blob:" : "";
  const connectExtra = isDev ? "ws: wss:" : "";

  return [
    `default-src 'self'`,
    // 'strict-dynamic' makes browsers ignore the host allowlist for scripts
    // loaded by the nonced root script — the standard nonce-based CSP idiom.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${scriptExtra}`.trim(),
    // 'unsafe-inline' for styles is the pragmatic call: Tailwind injects
    // inline atomic styles, next/font emits inline @font-face blocks, and
    // motion sets inline transforms. Style-based XSS is not a meaningful
    // vector when script-src is locked down with a nonce.
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https://raw.githubusercontent.com https://avatars.githubusercontent.com`,
    `font-src 'self' data:`,
    `connect-src 'self' ${vercel} ${connectExtra}`.trim(),
    `media-src 'self'`,
    `worker-src 'self' blob:`,
    `manifest-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `frame-src 'none'`,
    `upgrade-insecure-requests`,
    // Trusted Types — Lighthouse "trusted-types-xss" audit requires this in
    // the enforced policy. A no-op default policy is bootstrapped in
    // layout.tsx so React's `dangerouslySetInnerHTML` keeps working.
    // 'allow-duplicates' lets framework code register policies it may add in
    // future releases without us having to update this list.
    `require-trusted-types-for 'script'`,
    `trusted-types default nextjs 'allow-duplicates'`,
  ].join("; ");
}

const PERMISSIONS_POLICY = [
  "accelerometer=()",
  "ambient-light-sensor=()",
  "autoplay=()",
  "battery=()",
  "camera=()",
  "display-capture=()",
  "document-domain=()",
  "encrypted-media=()",
  "execution-while-not-rendered=()",
  "execution-while-out-of-viewport=()",
  "fullscreen=(self)",
  "geolocation=()",
  "gyroscope=()",
  "keyboard-map=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "navigation-override=()",
  "payment=()",
  "picture-in-picture=()",
  "publickey-credentials-get=()",
  "screen-wake-lock=()",
  "sync-xhr=()",
  "usb=()",
  "web-share=()",
  "xr-spatial-tracking=()",
  "interest-cohort=()",
  "browsing-topics=()",
].join(", ");

export function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV !== "production";

  // Per-request nonce. Web Crypto is available in the Edge runtime.
  const nonce = btoa(crypto.randomUUID() + crypto.randomUUID()).replace(/=/g, "");

  const csp = buildCsp(nonce, isDev);

  // Propagate the nonce to the rendered page via a request header so that
  // server components can read it via `headers()` and stamp inline scripts.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", PERMISSIONS_POLICY);
  response.headers.set("X-DNS-Prefetch-Control", "on");

  return response;
}

// Skip static asset routes — they don't render HTML, don't need a CSP, and
// running the proxy on them wastes edge cycles. Prefetched routes also skip
// (the nonce would mismatch when the actual navigation happens).
export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|fonts|images|textures|og|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2|ttf|otf|eot|css|js|map|pdf|xml|txt|json)).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
