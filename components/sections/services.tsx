import { useLocale, useTranslations } from 'next-intl';
import { services as servicesIt } from '@/content/it';
import { services as servicesEn } from '@/content/en';
import { Reveal } from '@/components/primitives/reveal';
import { Scribble } from '@/components/primitives/scribble';
import { ServiceScale } from '@/components/sections/service-scale';

/** Left gutter that holds the rail and its ticks. */
const GUTTER = 'clamp(2.25rem, 5vw, 4.5rem)';

/**
 * Per-station geometry, 01 to 04. The offerings are ordered along an axis the
 * copy already implies, from most present (one-to-one in studio) to most
 * flexible (remote). Spacing tightens and the type steps down as you descend:
 * presence compresses, literally, in the layout. This reads with no JS at all;
 * the scale animation only makes it legible.
 */
const STEPS = [
  {
    gap: '0',
    numeral: 'clamp(2.25rem, 5vw, 3.75rem)',
    title: 'clamp(1.7rem, 2.6vw + 0.6rem, 2.6rem)',
    body: '1.125rem',
    measure: '56ch',
  },
  {
    gap: 'clamp(3rem, 6vw, 5.5rem)',
    numeral: 'clamp(1.75rem, 3.4vw, 2.6rem)',
    title: 'clamp(1.4rem, 1.6vw + 0.6rem, 1.95rem)',
    body: '1.0625rem',
    measure: '52ch',
  },
  {
    gap: 'clamp(2.25rem, 4.2vw, 3.75rem)',
    numeral: 'clamp(1.4rem, 2.5vw, 1.95rem)',
    title: 'clamp(1.2rem, 1vw + 0.6rem, 1.55rem)',
    body: '1rem',
    measure: '48ch',
  },
  {
    gap: 'clamp(1.75rem, 3vw, 2.5rem)',
    numeral: 'clamp(1.2rem, 2vw, 1.55rem)',
    title: 'clamp(1.1rem, 0.7vw + 0.6rem, 1.3rem)',
    body: '1rem',
    measure: '44ch',
  },
] as const;

const CAP_STYLE = {
  fontFamily: 'var(--font-display)',
  fontSize: 10,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--ink-55)',
  fontWeight: 600,
  paddingLeft: GUTTER,
} as const;

export function Services() {
  const t = useTranslations('Services');
  const locale = useLocale();
  const items = locale === 'en' ? servicesEn : servicesIt;

  return (
    <section
      id="services"
      className="relative px-4 py-24 md:py-32 lg:py-36"
      style={{ background: 'var(--paper-2)' }}
    >
      <div className="mx-auto max-w-screen-xl md:px-4 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <h2
              className="text-[clamp(2rem,4vw+0.8rem,3.5rem)] leading-tight font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('heading')}
            </h2>
            <div className="mt-1 w-[clamp(9rem,22vw,18rem)]">
              <Scribble kind="underline-double" />
            </div>
            <p
              className="mt-6 text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
            >
              {t('lead')}
            </p>
          </div>
        </Reveal>

        {/* The two ends of the scale. Real labels, not decoration: they are what
            explains the ordering to someone scanning. */}
        <p className="mt-12 mb-6 md:mt-16" style={CAP_STYLE}>
          {t('scaleTop')}
        </p>

        <ServiceScale>
          <ol className="max-w-3xl list-none" style={{ paddingLeft: GUTTER }}>
            {items.map((s, i) => {
              const step = STEPS[i] ?? STEPS[STEPS.length - 1]!;
              return (
                <li key={s.id} data-station style={{ position: 'relative', marginTop: step.gap }}>
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: `calc(-1 * ${GUTTER})`,
                      top: '0.7em',
                      width: 'clamp(1.1rem, 2.6vw, 2rem)',
                      height: 1,
                      background: 'var(--gold)',
                    }}
                  />
                  <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: step.numeral,
                        lineHeight: 0.85,
                        color: 'var(--accent)',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 11,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-55)',
                        fontWeight: 600,
                      }}
                    >
                      {s.mode}
                    </span>
                  </div>
                  <h3
                    className="mt-2 leading-tight font-bold"
                    style={{ fontFamily: 'var(--font-display)', fontSize: step.title }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-3 leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--ink-70)',
                      fontSize: step.body,
                      maxWidth: step.measure,
                    }}
                  >
                    {s.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </ServiceScale>

        <p className="mt-8" style={CAP_STYLE}>
          {t('scaleBottom')}
        </p>
      </div>
    </section>
  );
}
