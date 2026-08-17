import { setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/sections/hero';
import { Marquee } from '@/components/sections/marquee';
import { About } from '@/components/sections/about';
import { Process } from '@/components/sections/process';
import { Services } from '@/components/sections/services';
// Commented out, not deleted: the three stories were written as placeholders
// (Marta R., Paolo M., Sofia D.), and a testimonial nobody actually said is
// worse than no testimonial at all. Restore the section here, its anchor in
// nav.tsx and the `Stories` strings once there are real ones to quote.
// import { CaseStories } from '@/components/sections/case-stories';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { RevealScope } from '@/components/primitives/reveal-scope';
import { ScrollProgress } from '@/components/primitives/scroll-progress';
import { PointerTool } from '@/components/primitives/pointer-tool';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd locale={locale} />
      <ScrollProgress />
      <RevealScope />
      <PointerTool />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Process />
        <Services />
        {/* <CaseStories /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
