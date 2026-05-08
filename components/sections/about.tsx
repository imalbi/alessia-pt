import { useTranslations } from 'next-intl';
import { Photo } from '@/components/primitives/photo';
import { Scribble } from '@/components/primitives/scribble';

export function About() {
  const t = useTranslations('About');
  return (
    <section
      id="about"
      className="relative mx-auto max-w-screen-xl px-4 py-20 md:px-8 md:py-28 lg:px-12 lg:py-32"
    >
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <div className="md:order-1">
          <Photo ratio="3/4" tone="studio" label={t('photoLabel')} rotate={1} />
        </div>
        <div className="md:order-2">
          <h2
            className="text-[clamp(2rem,4vw+0.8rem,3.5rem)] font-bold leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('heading')}
          </h2>
          <div className="relative mt-2 w-32">
            <Scribble kind="underline" />
          </div>
          <p
            className="mt-8 max-w-prose text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink)' }}
          >
            {t('intro')}
          </p>
          <p
            className="mt-6 max-w-prose leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('credentials')}
          </p>
          <p
            className="mt-6 max-w-prose leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('method')}
          </p>
        </div>
      </div>
    </section>
  );
}
