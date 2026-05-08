import { marked } from 'marked';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/sections/footer';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);

  const filePath = path.join(process.cwd(), 'i18n/privacy', `${locale}.md`);
  const md = readFileSync(filePath, 'utf-8');
  const html = await marked.parse(md);

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
