import { setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}
