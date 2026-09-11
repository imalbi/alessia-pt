import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import '../globals.css';

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
  SITE_DESCRIPTION_IT,
  getSiteUrl,
} from '@/i18n/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const title = SITE_TITLE_IT;
  const description = SITE_DESCRIPTION_IT;
  const path = '/';
  return {
    metadataBase: new URL(getSiteUrl()),
    title: { default: title, template: `%s · ${SITE_NAME}` },
    description,
    alternates: {
      canonical: path,
      languages: { it: '/', 'x-default': '/' },
    },
    openGraph: {
      type: 'website',
      locale: 'it_IT',
      url: path,
      title,
      description,
      siteName: SITE_NAME,
      // A file, not the old `/og` route handler: see scripts/build-og.mjs.
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
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
          <Providers>{children}</Providers>
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
