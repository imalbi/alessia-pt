import { useLocale, useTranslations } from 'next-intl';
import { caseStories as casesIt } from '@/content/it';
import { caseStories as casesEn } from '@/content/en';
import { Scribble } from '@/components/primitives/scribble';

export function CaseStories() {
  const t = useTranslations('Stories');
  const locale = useLocale();
  const items = locale === 'en' ? casesEn : casesIt;

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

        <ul className="flex flex-col gap-12 md:gap-16">
          {items.map((s, i) => (
            <li key={s.id}>
              <article
                className="grid gap-4 border-t pt-8 md:grid-cols-[auto_1fr] md:gap-12 md:pt-10"
                style={{ borderColor: 'var(--ink-15)' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-55)',
                    fontWeight: 600,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="max-w-prose">
                  <blockquote
                    className="text-xl leading-relaxed md:text-2xl"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--ink)' }}
                  >
                    «{s.quote}»
                  </blockquote>
                  <footer
                    className="mt-4 text-sm"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
                  >
                    <span style={{ color: 'var(--ink)' }}>{s.name}</span>, {s.age} ·{' '}
                    {s.situation} · {s.duration}
                  </footer>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
