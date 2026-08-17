/**
 * Bakes the share card (public/og.png) and the iOS home-screen icon
 * (app/apple-icon.png).
 *
 * These used to be an `/og` route rendering an ImageResponse per request. Two
 * reasons that had to go. The route declared `runtime = 'edge'`, which the
 * Cloudflare adapter does not support at all, so on the real deploy target the
 * link preview would simply have been broken. And generating a PNG on demand is
 * the one thing in this site that could plausibly exceed the 10ms of CPU a free
 * Worker gets per request. The card is the same image forever: it belongs on
 * disk, not in a handler.
 *
 * Run after a build, since the fonts are lifted out of the build output rather
 * than vendored into the repo:
 *
 *   yarn build && yarn og
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * next/font rewrites Google's CSS into the build with hashed filenames, so the
 * only reliable way to find a face is to read the @font-face rules back out.
 * `U+??` is the latin subset, the one that carries the characters we set here.
 */
function findFont(family) {
  const dir = path.join(ROOT, '.next/static/chunks');
  if (!fs.existsSync(dir)) {
    throw new Error('.next is missing. Run `yarn build` before `yarn og`.');
  }
  const css = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.css'))
    .map((f) => fs.readFileSync(path.join(dir, f), 'utf8'))
    .join('');
  for (const rule of css.match(/@font-face\{[^}]*\}/g) ?? []) {
    if (!rule.includes(`font-family:${family}`)) continue;
    if (!rule.includes('U+??')) continue;
    const file = rule.match(/media\/([^)]+\.woff2)/)?.[1];
    if (file)
      return fs.readFileSync(path.join(ROOT, '.next/static/media', file)).toString('base64');
  }
  throw new Error(`No latin subset found for ${family}.`);
}

const display = findFont('Bricolage Grotesque');
const mono = findFont('IBM Plex Mono');
const photo = fs.readFileSync(path.join(ROOT, 'public/photos/hero-tools.jpg')).toString('base64');

const FACES = `
  @font-face { font-family: 'Display'; src: url(data:font/woff2;base64,${display}) format('woff2');
               font-weight: 400 800; font-display: block; }
  @font-face { font-family: 'Mono'; src: url(data:font/woff2;base64,${mono}) format('woff2');
               font-weight: 400; font-display: block; }
  * { margin: 0; box-sizing: border-box; }
  body { background: #0a0a0c; color: #f4f2ee; }
`;

/**
 * The hero, cropped to a card. Same photograph, same two scrims, same outlined
 * third line: someone who taps the link should land on the picture they just
 * saw, not on a different brand.
 */
const CARD = `<!doctype html><meta charset="utf-8"><style>${FACES}
  .card { position: relative; width: 1200px; height: 630px; overflow: hidden;
          display: flex; flex-direction: column; justify-content: flex-end; padding: 64px 72px; }
  .shot { position: absolute; inset: 0; background:
            url(data:image/jpeg;base64,${photo}) 72% 46% / cover no-repeat; transform: scale(1.06); }
  .scrim-x { position: absolute; inset: 0; background: linear-gradient(90deg,
              #0a0a0c 0%, rgba(10,10,12,.88) 30%, rgba(10,10,12,.38) 62%, rgba(10,10,12,.1) 100%); }
  .scrim-y { position: absolute; inset: 0; background: linear-gradient(0deg,
              #0a0a0c 1%, rgba(10,10,12,.4) 26%, transparent 62%); }
  .body { position: relative; }
  .eyebrow { display: flex; align-items: center; gap: 16px; margin-bottom: 34px; }
  .rule { width: 64px; height: 1px; background: #d4a958; }
  .cap { font-family: 'Mono'; font-size: 19px; letter-spacing: .22em; text-transform: uppercase;
         color: rgba(244,242,238,.72); }
  h1 { font-family: 'Display'; font-weight: 800; font-size: 128px; line-height: .84;
       letter-spacing: -.045em; text-transform: uppercase; }
  .out { color: #0a0a0c; paint-order: stroke fill; -webkit-text-stroke: 2px #9c5bff; }
  .foot { position: relative; display: flex; align-items: center; gap: 14px; margin-top: 40px; }
  .dot { width: 7px; height: 7px; border-radius: 999px; background: #9c5bff; }
</style>
<div class="card">
  <div class="shot"></div><div class="scrim-x"></div><div class="scrim-y"></div>
  <div class="body">
    <div class="eyebrow"><span class="rule"></span><span class="cap">Chinesiologa · Personal Trainer</span></div>
    <h1>Alessia<br><span class="out">Alfano</span></h1>
  </div>
  <div class="foot">
    <span class="dot"></span>
    <span class="cap">Susa · postura · recupero · forza funzionale</span>
  </div>
</div>`;

/** 180px square. iOS rounds and shadows it itself, so it gets neither here. */
const ICON = `<!doctype html><meta charset="utf-8"><style>${FACES}
  .icon { width: 180px; height: 180px; display: grid; place-items: center; background: #0a0a0c;
          border: 4px solid #14141a; }
  span { font-family: 'Display'; font-weight: 800; font-size: 118px; line-height: 1;
         letter-spacing: -.06em; color: #0a0a0c; paint-order: stroke fill;
         -webkit-text-stroke: 5px #9c5bff; }
</style><div class="icon"><span>A</span></div>`;

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });

// The card is a photograph, so JPEG: the same frame as a PNG is roughly half a
// megabyte, and WhatsApp drops the thumbnail on link previews well before that.
for (const [html, selector, out, options] of [
  [CARD, '.card', 'public/og.jpg', { type: 'jpeg', quality: 86 }],
  [ICON, '.icon', 'app/apple-icon.png', {}],
]) {
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator(selector).screenshot({ path: path.join(ROOT, out), ...options });
  const kb = Math.round(fs.statSync(path.join(ROOT, out)).size / 1024);
  console.log(`wrote ${out} (${kb} KB)`);
}

await browser.close();
