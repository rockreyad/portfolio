# mrhasan.dev

Personal portfolio site for **Mahamud Hasan** ([rockreyad](https://github.com/rockreyad)) — full-stack software engineer at Kaon, independent founder of LiveSnaps, based in Dhaka, BD.

Live site: **[mrhasan.dev](https://mrhasan.dev)**

---

## Highlights

- **Case studies** for shipped products — FlowGPT, Emochi, TakeNote.ai, LiveSnaps, Blinto — authored as MDX with structured frontmatter.
- **Live, interactive CV at `/cv`** rendered from LaTeX source via [react-pdf](https://github.com/wojtekmaj/react-pdf) — text is selectable, hyperlinks are clickable, in-page search works, screen readers can access it. Falls back to a Download button.
- **Three themes** (light, dark, high-contrast) via [next-themes](https://github.com/pacocoursey/next-themes), wired to OKLAB color tokens.
- **Custom WebGL shader hero** (raw WebGL, no Three.js / R3F).
- **Buttery scroll** via [lenis](https://github.com/darkroomengineering/lenis), purposeful motion via [motion](https://motion.dev/) — both respect `prefers-reduced-motion`.
- **Command palette** (Cmd+K) for navigation.
- **Edge-friendly SEO** — programmatic sitemap, robots, OpenGraph/Twitter, JSON-LD Person schema.

## Tech stack

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack)
- **React 19**, **TypeScript 5**
- **[Tailwind CSS v4](https://tailwindcss.com/)** with CSS variables for design tokens
- **[next-mdx-remote-client](https://github.com/talatkuyuk/next-mdx-remote-client)** + [gray-matter](https://github.com/jonschlinkert/gray-matter) for MDX case studies
- **[motion](https://motion.dev/)**, **[lenis](https://github.com/darkroomengineering/lenis)**, **[next-themes](https://github.com/pacocoursey/next-themes)**
- **[react-pdf](https://github.com/wojtekmaj/react-pdf)** + **[pdfjs-dist](https://github.com/mozilla/pdf.js)** for the CV viewer
- **[tectonic](https://tectonic-typesetting.github.io/)** for compiling the CV LaTeX source
- **[@vercel/analytics](https://vercel.com/docs/analytics)**, **[@vercel/speed-insights](https://vercel.com/docs/speed-insights)**

## Getting started

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. The `postinstall` hook copies the PDF.js worker into `public/` so the `/cv` viewer works out of the box.

### Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Next.js dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm cv:build` | Compile `cv/main.tex` → `public/mahamud-hasan-cv.pdf` |

## Routes

`sitemap.xml` and `robots.txt` are generated automatically from [`src/app/sitemap.ts`](src/app/sitemap.ts) and [`src/app/robots.ts`](src/app/robots.ts).

| Path | Description |
| --- | --- |
| `/` | Home (hero, selected work, about preview) |
| `/work` | All case studies |
| `/work/:slug` | Individual case study (MDX) |
| `/about` | About |
| `/now` | What I'm focused on right now |
| `/uses` | Hardware & software I use |
| `/stack` | Tech I reach for |
| `/archive` | Archive |
| `/contact` | Contact |
| `/cv` | Live CV viewer with download |
| `/resume` | 307 redirect → `/cv` |
| `/writing/:slug` | Long-form posts (when published) |

## Project structure

```
src/
  app/                    # App Router routes + metadata (sitemap, robots, manifest, og)
  components/
    chrome/               # Header, Footer, command palette, grain overlay
    motion/               # Lenis + motion providers, SplitText, Magnetic, ScrollProgress
    primitives/           # Button, Text, Eyebrow, Signature
    sections/             # Hero (with WebGL mesh), Work grid, About preview, etc.
    case-study/           # MDX renderers for /work/:slug
    providers/            # ThemeProvider
  content/
    work/                 # Case study MDX + frontmatter schema
    writing/              # Long-form posts (MDX)
  lib/                    # seo, content loaders, cn, site-data
  hooks/                  # use-prefers-reduced-motion, etc.

cv/                       # LaTeX source for the resume
  main.tex
  deedy-resume-openfont.cls
  fonts/leaguespartan/    # 9 LeagueSpartan TTFs
  .tools/bin/             # auto-fetched tectonic binary (gitignored)

public/                   # Static assets — committed CV PDF, PDF.js worker, fonts, OG images
scripts/                  # build-cv.sh, copy-pdfjs-worker.mjs
```

## CV / Resume pipeline

`/cv` renders the resume as a live PDF (selectable text, clickable links, no iframe) and `/resume` redirects to it.

```bash
pnpm cv:build           # → public/mahamud-hasan-cv.pdf
```

[`scripts/build-cv.sh`](scripts/build-cv.sh) self-bootstraps `tectonic` from the upstream continuous release into `cv/.tools/bin/` (gitignored), then compiles `cv/main.tex` with XeLaTeX. The committed PDF is what Vercel serves.

[`scripts/copy-pdfjs-worker.mjs`](scripts/copy-pdfjs-worker.mjs) (wired as `postinstall`) copies the PDF.js worker out of `react-pdf`'s pinned `pdfjs-dist` into `public/pdf.worker.min.mjs`, keeping the API and worker versions locked.

> The build script ships its own `tectonic` because Homebrew's `tectonic@0.16.9` still trips upstream issue [#1342](https://github.com/tectonic-typesetting/tectonic/issues/1342) when loading `fontawesome5`. The continuous-release binary contains the fix. Set `TECTONIC_BIN=$(which tectonic)` to override.

The resume template is the [Deedy two-column XeTeX template](https://github.com/rockreyad/updated-Deedy-Resume), Apache-2.0. The class file's license header is preserved verbatim in `cv/deedy-resume-openfont.cls`.

## Deploy

Deployed on **Vercel**. No special build flags — `pnpm build` from the root. The committed `public/mahamud-hasan-cv.pdf` and `public/pdf.worker.min.mjs` mean Vercel doesn't need `tectonic` or `postinstall` to run.

## License & usage

This is a personal portfolio. Source is published for transparency and reference, not as a template — please don't redeploy it verbatim with my content. The content (case studies, copy, photos, resume) is © Mahamud Hasan, all rights reserved. Feel free to learn from the patterns or borrow small snippets with attribution.

## Acknowledgments

- The [Deedy Resume template](https://github.com/rockreyad/updated-Deedy-Resume) (Apache-2.0)
- [Mozilla PDF.js](https://github.com/mozilla/pdf.js) and [`react-pdf`](https://github.com/wojtekmaj/react-pdf)
- [Tectonic Typesetting](https://tectonic-typesetting.github.io/)
- [Vercel](https://vercel.com/) for hosting + analytics

---

Find me on [GitHub](https://github.com/rockreyad), [LinkedIn](https://www.linkedin.com/in/rockreyad), or [Twitter](https://twitter.com/rockreyad).
