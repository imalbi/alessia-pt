# Alessia Alfano: personal trainer and kinesiologist

Single-page site for a personal trainer and kinesiologist working in Susa, Piedmont. It has one job: get a qualified visitor to send a message through the contact form. Most visitors arrive on a phone from Instagram or a local search, so the page is designed mobile-first.

Live: https://chinesiologa.alessiaalfano.workers.dev

The site copy is in Italian because the audience is Italian. The product and design documents ([PRODUCT.md](PRODUCT.md), [DESIGN.md](DESIGN.md)) are in Italian too.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4, Radix UI primitives, Sonner, Vaul, GSAP with ScrollTrigger
- next-intl (a single `it` locale, kept so a second one is a small change), next-themes (dark by default, light on request)
- react-hook-form with Zod for the contact form
- Resend for email and a Telegram bot for instant notifications
- Cloudflare Workers through the OpenNext adapter
- Vitest, Playwright and axe, with GitHub Actions running them

## What is worth a look

**The contact flow.** `POST /api/contact` validates the body with Zod, applies a per-IP rate limit, then sends the email and the Telegram message in parallel. One provider failing does not lose the message; the request only returns 502 when both fail. Every failure is logged with its reason and never with the payload, because the payload is the personal data the visitor consented to share.

**Accessibility as a test, not a claim.** The e2e suite runs axe against the home and privacy pages and fails on serious or critical violations. Form errors set `aria-invalid` and `aria-describedby`, and focus moves to the first invalid field.

**Two deployment pitfalls on Workers**, both found by comparing the live site with a local build:

- `/_next/image` only resizes when the Worker has an Images binding. Without it the original file is served: a 128 px avatar weighed 144 KB. The binding is declared in `wrangler.toml`.
- wrangler's `keep_names` wraps inner functions in `__name()`. next-themes serialises its pre-paint script with `toString()`, so the helper was missing in the browser and the script threw. It is switched off in `wrangler.toml`.

**Design documents.** [PRODUCT.md](PRODUCT.md) states who the visitor is and what counts as success. [DESIGN.md](DESIGN.md) records the system: tokens, type, motion rules and the things the site deliberately does not do.

## Getting started

Needs Node 20 or newer and Yarn 4 (via Corepack).

```bash
corepack enable
yarn install
cp .env.example .env.local   # fill in the values you need
yarn dev
```

Environment variables are listed in `.env.example`. The contact form delivers through two independent providers: email needs `RESEND_API_KEY`, `CONTACT_EMAIL_FROM` and `CONTACT_EMAIL_TO`, Telegram needs `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.

| Command                                            | What it does                                       |
| -------------------------------------------------- | -------------------------------------------------- |
| `yarn dev`                                         | Development server on port 3000                    |
| `yarn typecheck`, `yarn lint`, `yarn format:check` | Static checks                                      |
| `yarn test`                                        | Vitest: unit and integration tests                 |
| `yarn test:e2e`                                    | Playwright, including the axe check                |
| `yarn cf:preview`                                  | Build for Workers and run it locally with wrangler |
| `yarn cf:deploy`                                   | Build and deploy to Cloudflare                     |

CI runs the static checks, the unit and integration tests, the e2e suite on Chromium and a production build.

## Layout

```
app/          routes, the contact API and the metadata routes
components/   sections, primitives and UI building blocks
i18n/         next-intl config and the Italian messages
lib/          contact delivery, rate limit, validation, scroll helpers
tests/        unit, integration and e2e
```

## License

All rights reserved. The source is public so it can be read and evaluated; see [LICENSE](LICENSE). The site copy, photographs and brand elements belong to Alessia Alfano.
