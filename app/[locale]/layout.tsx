import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Bricolage_Grotesque, Newsreader, Caveat } from 'next/font/google';
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
  weight: ['500', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
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

export const metadata: Metadata = {
  title: {
    default: 'Alessia · Personal Trainer & Chinesiologa',
    template: '%s · Alessia',
  },
  description: 'Personal training e chinesiologia. Postura, recupero, percorsi su misura.',
};

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
      className={`${bricolage.variable} ${newsreader.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
        <Toaster position="bottom-center" richColors />
        <TweaksPanel />
      </body>
    </html>
  );
}
