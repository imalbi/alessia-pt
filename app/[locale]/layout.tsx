import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Bricolage_Grotesque, Caveat } from 'next/font/google';
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
  weight: ['400', '500', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

import { SITE_NAME, SITE_DESCRIPTION_IT, SITE_DESCRIPTION_EN, getSiteUrl } from '@/i18n/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const description = locale === 'en' ? SITE_DESCRIPTION_EN : SITE_DESCRIPTION_IT;
  const baseUrl = getSiteUrl();
  return {
    metadataBase: new URL(baseUrl),
    title: { default: SITE_NAME, template: '%s · Alessia' },
    description,
    alternates: {
      canonical: locale === 'it' ? '/' : `/${locale}`,
      languages: { it: '/', en: '/en' },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_GB' : 'it_IT',
      url: baseUrl,
      title: SITE_NAME,
      description,
      siteName: SITE_NAME,
      images: [{ url: '/og', width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: { card: 'summary_large_image', title: SITE_NAME, description },
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
      className={`${bricolage.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
        <Toaster position="bottom-center" richColors />
        <TweaksPanel />
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
