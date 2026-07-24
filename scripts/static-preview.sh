#!/usr/bin/env bash
#
# Builds a fully static snapshot of the site into .preview/, ready to drop on
# any dumb file host (Surge, Netlify drop, GitHub Pages) so the client can look
# at it from a phone.
#
# This is a REVIEW artefact, not a deploy. Two things do not work in it:
#   - the contact form: /api/contact needs a server runtime
#   - locale redirects: the middleware does not run
# The real deploy is `yarn cf:deploy` (Cloudflare Workers), which keeps both.
#
# Usage:  yarn preview:static [public-url]
#         yarn preview:static https://alessia-preview.surge.sh
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/.preview"
PORT="${PREVIEW_PORT:-3100}"
SITE_URL="${1:-${NEXT_PUBLIC_SITE_URL:-https://alessia-preview.surge.sh}}"

cd "$ROOT"

echo "==> Building with STATIC_PREVIEW=1 (image optimizer off), site URL $SITE_URL"
STATIC_PREVIEW=1 NEXT_PUBLIC_SITE_URL="$SITE_URL" yarn build

echo "==> Serving the production build on :$PORT"
STATIC_PREVIEW=1 NEXT_PUBLIC_SITE_URL="$SITE_URL" PORT="$PORT" yarn start >"$OUT.log" 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 40); do
  curl -sf -o /dev/null "http://localhost:$PORT/" && break
  sleep 0.5
done

SRC="http://localhost:$PORT"
rm -rf "$OUT"
mkdir -p "$OUT"
cd "$OUT"

# localePrefix is 'as-needed': Italian lives at /, English at /en.
echo "==> Fetching pages"
for pair in "index.html:/" "en/index.html:/en" "privacy/index.html:/privacy" "en/privacy/index.html:/en/privacy"; do
  dest="${pair%%:*}"
  path="${pair#*:}"
  mkdir -p "$(dirname "$dest")"
  curl -sL "$SRC$path" -o "$dest"
done

# The OG image comes from a route handler, which a static host cannot run.
# Bake it to a file and repoint the meta tags at it.
curl -sL "$SRC/og" -o og.png
curl -sL "$SRC/robots.txt" -o robots.txt || true
curl -sL "$SRC/sitemap.xml" -o sitemap.xml || true
find . -name "*.html" -exec sed -i 's#/og"#/og.png"#g' {} +

echo "==> Fetching build assets"
grep -ho '/_next/[A-Za-z0-9._/~-]*' index.html en/index.html privacy/index.html en/privacy/index.html |
  sort -u >assets.txt
while read -r asset; do
  mkdir -p ".$(dirname "$asset")"
  curl -sL "$SRC$asset" -o ".$asset"
done <assets.txt
ASSET_COUNT=$(wc -l <assets.txt)
rm assets.txt

echo "==> Copying public/ images"
cp -r "$ROOT/public/photos" . 2>/dev/null || true
cp -r "$ROOT/public/favicon" . 2>/dev/null || true
cp "$ROOT"/public/*.svg . 2>/dev/null || true
cp "$ROOT/public/favicon.ico" . 2>/dev/null || true
# The uncropped source is not referenced by any page.
rm -f photos/about-laurea.jpg

# Surge serves 200.html for paths it cannot match.
cp index.html 200.html

echo
echo "Snapshot pronto: $OUT  ($ASSET_COUNT asset, $(du -sh . | cut -f1))"
echo "Pubblica con:  npx surge $OUT ${SITE_URL#https://}"
