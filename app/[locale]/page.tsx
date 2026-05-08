import { setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Services } from '@/components/sections/services';
import { CaseStories } from '@/components/sections/case-stories';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import { JsonLd } from '@/components/seo/json-ld';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd locale={locale} />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <CaseStories />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
