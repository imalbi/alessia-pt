import { useLocale, useTranslations } from 'next-intl';
import { caseStories as casesIt } from '@/content/it';
import { caseStories as casesEn } from '@/content/en';
import { Reveal } from '@/components/primitives/reveal';
import { Scribble } from '@/components/primitives/scribble';

/** Vertical offsets that break the three-identical-columns grid. */
const OFFSETS = ['md:mt-0', 'md:mt-8', 'md:mt-16'] as const;

export function CaseStories() {
  const t = useTranslations('Stories');
  const locale = useLocale();
  const source = locale === 'en' ? casesEn : casesIt;

  // Shortest first, so the gold bars read as a rising measure across the row.
  const items = [...source].sort((a, b) => a.months - b.months);
  const longest = Math.max(...items.map((s) => s.months), 1);

  return (
    <section
      id="stories"
      className="px-4 py-24 md:py-32 lg:py-36"
      style={{ background: 'var(--paper)' }}
    >
      <Reveal className="mx-auto max-w-screen-xl md:px-4 lg:px-8">
        <div className="mb-12 max-w-2xl md:mb-16">
          <h2
            className="text-[clamp(2rem,4vw+0.8rem,3.5rem)] leading-tight font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('heading')}
          </h2>
          <div className="mt-1 w-[clamp(7rem,15vw,12rem)]">
            <Scribble kind="underline" />
          </div>
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('lead')}
          </p>
        </div>

        <ul className="grid list-none gap-x-8 gap-y-12 md:grid-cols-3 md:items-start lg:gap-x-12">
          {items.map((s, i) => (
            <li
              key={s.id}
              className={`border-t pt-6 ${OFFSETS[i] ?? ''}`}
              style={{ borderColor: 'var(--ink-15)' }}
            >
              <span
                className="block text-[10px] font-semibold tracking-[0.16em] uppercase"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-55)' }}
              >
                {s.duration}
              </span>
              {/* Length is the datum: how long the work actually took, drawn to
                  scale against the longest of the three. Static on purpose,
                  DESIGN.md keeps animation to the two choreographed moments. */}
              <span
                aria-hidden
                className="mt-2 mb-4 block h-0.5"
                style={{
                  width: `${Math.round((s.months / longest) * 100)}%`,
                  background: 'var(--gold)',
                }}
              />
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
                {s.situation}
              </footer>
            </li>
          ))}
        </ul>

        <p
          className="mt-12 text-xs tracking-wide md:mt-16"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--ink-55)',
            letterSpacing: '0.04em',
          }}
        >
          {t('disclosure')}
        </p>
      </Reveal>
    </section>
  );
}
