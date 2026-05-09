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

        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-3 lg:gap-x-12">
          {items.map((s, i) => (
            <li key={s.id} className="border-t pt-6" style={{ borderColor: 'var(--ink-15)' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 'clamp(1.5rem, 2vw + 0.5rem, 2rem)',
                  lineHeight: 1,
                  color: 'var(--accent)',
                  letterSpacing: '-0.02em',
                  marginBottom: 14,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <blockquote
                className="text-lg leading-relaxed"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  color: 'var(--ink)',
                }}
              >
                «{s.quote}»
              </blockquote>
              <footer
                className="mt-4 text-sm"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
              >
                <span style={{ color: 'var(--ink)' }}>{s.name}</span>, {s.age}
                <br />
                {s.situation} · {s.duration}
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
