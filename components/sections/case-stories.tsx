'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLocale, useTranslations } from 'next-intl';
import { caseStories as casesIt } from '@/content/it';
import { caseStories as casesEn } from '@/content/en';
import { Scribble } from '@/components/primitives/scribble';

export function CaseStories() {
  const t = useTranslations('Stories');
  const locale = useLocale();
  const items = locale === 'en' ? casesEn : casesIt;
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  ]);

  return (
    <section
      id="stories"
      className="px-4 py-24 md:py-32 lg:py-36"
      style={{ background: 'var(--paper)' }}
    >
      <div className="mx-auto max-w-screen-xl md:px-4 lg:px-8">
        <div className="mb-12 max-w-2xl md:mb-16">
          <h2
            className="text-[clamp(2rem,4vw+0.8rem,3.5rem)] leading-tight font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('heading')}
          </h2>
          <div className="mt-1 w-32">
            <Scribble kind="underline" />
          </div>
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('lead')}
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {items.map((s) => (
              <article
                key={s.id}
                className="flex min-w-0 shrink-0 grow-0 basis-full flex-col gap-4 sm:basis-[80%] md:basis-[55%] lg:basis-[40%]"
              >
                <blockquote
                  className="text-xl leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontStyle: 'italic',
                    color: 'var(--ink)',
                  }}
                >
                  «{s.quote}»
                </blockquote>
                <footer
                  className="text-sm"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
                >
                  — <span style={{ color: 'var(--ink)' }}>{s.name}</span>, {s.age} · {s.situation} ·{' '}
                  {s.duration}
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
