#!/usr/bin/env node
// Copy the pdfjs-dist worker that react-pdf depends on into public/ so the
// /cv viewer can load it from a stable URL (/pdf.worker.min.mjs). Re-run after
// upgrading react-pdf to keep API + worker versions in lockstep.
import { createRequire } from "node:module";
import { copyFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const reactPdfPkgUrl = import.meta.resolve("react-pdf/package.json");
const reactPdfRequire = createRequire(fileURLToPath(reactPdfPkgUrl));

const candidates = [
  "pdfjs-dist/build/pdf.worker.min.mjs",
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  "pdfjs-dist/build/pdf.worker.mjs",
];

let workerPath = null;
for (const spec of candidates) {
  try {
    workerPath = reactPdfRequire.resolve(spec);
    break;
  } catch {
    // try next
  }
}

if (!workerPath || !existsSync(workerPath)) {
  console.error(
    "error: could not resolve pdfjs-dist worker file from react-pdf. Tried: " +
      candidates.join(", "),
  );
  process.exit(1);
}

const dest = join(repoRoot, "public", "pdf.worker.min.mjs");
await mkdir(dirname(dest), { recursive: true });
await copyFile(workerPath, dest);
console.log(`==> Copied pdfjs-dist worker → public/pdf.worker.min.mjs`);
