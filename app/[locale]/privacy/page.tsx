import type { Metadata } from 'next';
import { marked } from 'marked';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { privacyMarkdown } from '@/i18n/privacy/content';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/sections/footer';

/**
 * Without this the page inherited the home page's title and description, so the
 * two routes went into the index announcing themselves as the same thing.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Informativa privacy',
    description:
      'Come vengono trattati i dati inviati dal modulo di contatto e per quanto tempo restano.',
    alternates: {
      canonical: '/privacy',
      languages: { it: '/privacy', 'x-default': '/privacy' },
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);

  const html = await marked.parse(privacyMarkdown());

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pt-32 pb-16 md:pt-40 md:pb-24 lg:px-8">
        <article
          className="privacy-prose"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--ink)' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
      <Footer />
    </>
  );
}
