import { useTranslations } from 'next-intl';
import { Photo } from '@/components/primitives/photo';
import { Scribble } from '@/components/primitives/scribble';
import { Button } from '@/components/ui/button';

export function Hero() {
  const t = useTranslations('Hero');
  return (
    <section className="relative mx-auto max-w-screen-xl px-4 pb-12 pt-24 md:px-8 md:pb-16 md:pt-32 lg:px-12 lg:pt-40">
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16 lg:gap-20">
        <div>
          <h1
            className="text-[clamp(2.5rem,6vw+1rem,5.5rem)] font-extrabold leading-[0.95] tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            {t('name')}
            <br />
            <span style={{ color: 'var(--ink-70)', fontWeight: 500 }}>{t('role')}</span>
          </h1>
          <div className="relative mt-3 max-w-md">
            <Scribble kind="underline" />
          </div>
          <p
            className="mt-8 max-w-prose text-[clamp(1.125rem,0.5vw+1rem,1.25rem)] leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('tagline')}
          </p>
          <div className="mt-10">
            <Button asChild size="lg">
              <a href="#contact">{t('cta')}</a>
            </Button>
          </div>
        </div>
        <div className="relative">
          <Photo ratio="4/5" tone="warm" label={t('photoLabel')} taped rotate={-1} priority />
        </div>
      </div>
    </section>
  );
}
