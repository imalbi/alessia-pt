import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import dynamic from 'next/dynamic';
import '../globals.css';

// Dev-only: dynamic import keeps the panel out of production bundles entirely.
// Turbopack does not dead-code-eliminate `process.env.NODE_ENV === 'development' && <X />`
// at the import level, so we gate the import expression itself.
const TweaksPanel =
  process.env.NODE_ENV === 'development'
    ? dynamic(() => import('@/components/dev/tweaks-panel').then((m) => m.TweaksPanel))
    : () => null;

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

/**
 * Second family, deliberately narrow in scope: eyebrows, meta labels, ratio
 * caps, step numerals. Everything that is a *tag* rather than prose.
 *
 * DESIGN.md used to mandate a single-family voice, which is why labels and body
 * currently read at the same weight of attention. A mono at 10px with wide
 * tracking separates the two instantly and pushes the register towards the
 * technical/atelier side the brief asks for, without adding a display face that
 * would compete with Bricolage.
 */
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

import {
  SITE_NAME,
  SITE_TITLE_IT,
  SITE_TITLE_EN,
  SITE_DESCRIPTION_IT,
  SITE_DESCRIPTION_EN,
  getSiteUrl,
} from '@/i18n/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const english = locale === 'en';
  const title = english ? SITE_TITLE_EN : SITE_TITLE_IT;
  const description = english ? SITE_DESCRIPTION_EN : SITE_DESCRIPTION_IT;
  // `localePrefix: 'as-needed'` puts Italian at the root, so the Italian page is
  // also the sensible landing point for a language we do not serve: x-default
  // and the Italian alternate are the same URL on purpose.
  const path = english ? '/en' : '/';
  return {
    metadataBase: new URL(getSiteUrl()),
    title: { default: title, template: `%s · ${SITE_NAME}` },
    description,
    alternates: {
      canonical: path,
      languages: { it: '/', en: '/en', 'x-default': '/' },
    },
    openGraph: {
      type: 'website',
      locale: english ? 'en_GB' : 'it_IT',
      // Per locale. Declaring the root here made the English page announce
      // itself as the Italian one to every scraper that reads og:url first.
      url: path,
      title,
      description,
      siteName: SITE_NAME,
      // A file, not the old `/og` route handler: see scripts/build-og.mjs.
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <TweaksPanel />
          </Providers>
        </NextIntlClientProvider>
        <Toaster position="bottom-center" richColors />
        {process.env.NEXT_PUBLIC_CF_BEACON && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: process.env.NEXT_PUBLIC_CF_BEACON })}
          />
        )}
      </body>
    </html>
  );
}
