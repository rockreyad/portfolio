#!/usr/bin/env bash
# Compile cv/main.tex into public/mahamud-hasan-cv.pdf via tectonic.
#
# Why a project-local tectonic binary:
#   The 0.16.9 release tagged on Apr 17 2026 still trips upstream issue #1342
#   (fontawesome5-utex-helper.sty SIGABRT — `free(): invalid pointer` in
#   freeGlyphName). Fix is PR #1353, only available in tectonic's "continuous"
#   rolling release until the next tagged version ships. This script grabs
#   that continuous build the first time it runs and caches it under
#   cv/.tools/bin/, so users don't need to wrangle the upstream bug themselves.
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
cv_dir="$repo_root/cv"
out_dir="$repo_root/public"
tools_dir="$cv_dir/.tools/bin"
tectonic_bin="$tools_dir/tectonic"

os="$(uname -s)"
arch="$(uname -m)"

# Match the asset name on the tectonic-typesetting/tectonic "continuous" release.
case "$os/$arch" in
  Darwin/arm64) asset_filter="aarch64-apple-darwin.tar.gz" ;;
  Darwin/x86_64) asset_filter="x86_64-apple-darwin.tar.gz" ;;
  Linux/x86_64) asset_filter="x86_64-unknown-linux-musl.tar.gz" ;;
  Linux/aarch64) asset_filter="aarch64-unknown-linux-musl.tar.gz" ;;
  *)
    echo "error: unsupported platform $os/$arch — install tectonic manually and set TECTONIC_BIN" >&2
    exit 1
    ;;
esac

if [[ -n "${TECTONIC_BIN:-}" ]]; then
  tectonic_bin="$TECTONIC_BIN"
fi

if [[ ! -x "$tectonic_bin" ]]; then
  echo "==> Fetching patched tectonic (continuous build) for $os/$arch"
  mkdir -p "$tools_dir"
  asset_url=$(curl -sSfL https://api.github.com/repos/tectonic-typesetting/tectonic/releases/tags/continuous |
    python3 -c "import sys, json; d=json.load(sys.stdin); print(next(a['browser_download_url'] for a in d['assets'] if '$asset_filter' in a['name']))")
  if [[ -z "$asset_url" ]]; then
    echo "error: could not resolve tectonic continuous asset for $asset_filter" >&2
    exit 1
  fi
  curl -sSfL "$asset_url" -o "$tools_dir/tectonic.tar.gz"
  tar -xzf "$tools_dir/tectonic.tar.gz" -C "$tools_dir"
  rm "$tools_dir/tectonic.tar.gz"
  chmod +x "$tectonic_bin"
fi

# Continuous-build tectonic uses TectonicProject.Tectonic on macOS but doesn't
# always create the formats/ subdir on first run, so we precreate it.
if [[ "$os" == "Darwin" ]]; then
  mkdir -p "$HOME/Library/Caches/TectonicProject.Tectonic/formats"
fi

mkdir -p "$out_dir"

# Run from inside cv/ so the .cls's hardcoded 'Path = fonts/leaguespartan/' resolves.
cd "$cv_dir"
mkdir -p build
"$tectonic_bin" -X compile main.tex --outdir build --keep-logs

mv "$cv_dir/build/main.pdf" "$out_dir/mahamud-hasan-cv.pdf"
echo "==> Built $out_dir/mahamud-hasan-cv.pdf"
