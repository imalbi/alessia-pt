import { useLocale, useTranslations } from 'next-intl';
import { services as servicesIt } from '@/content/it';
import { services as servicesEn } from '@/content/en';
import { Scribble } from '@/components/primitives/scribble';

export function Services() {
  const t = useTranslations('Services');
  const locale = useLocale();
  const items = locale === 'en' ? servicesEn : servicesIt;
  const [featured, ...rest] = items;

  return (
    <section
      id="services"
      className="relative px-4 py-24 md:py-32 lg:py-36"
      style={{ background: 'var(--paper-2)' }}
    >
      <div className="mx-auto max-w-screen-xl md:px-4 lg:px-8">
        <div className="mb-16 max-w-2xl md:mb-20">
          <h2
            className="text-[clamp(2rem,4vw+0.8rem,3.5rem)] leading-tight font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('heading')}
          </h2>
          <div className="mt-1 w-40">
            <Scribble kind="underline-double" />
          </div>
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('lead')}
          </p>
        </div>

        {/* Featured offering — oversized viola number paired with the title. */}
        {featured && (
          <article className="border-t pt-10 md:pt-12" style={{ borderColor: 'var(--accent)' }}>
            <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-baseline md:gap-10">
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  lineHeight: 0.85,
                  color: 'var(--accent)',
                  letterSpacing: '-0.03em',
                }}
              >
                01
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  {t('featuredEyebrow')}
                </div>
                <h3
                  className="text-[clamp(1.75rem,2.5vw+1rem,2.75rem)] leading-tight font-bold"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {featured.title}
                </h3>
                <p
                  className="mt-5 max-w-prose text-lg leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
                >
                  {featured.description}
                </p>
              </div>
            </div>
          </article>
        )}

        {/* Collateral lineup — three compact cards with viola numerals. */}
        {rest.length > 0 && (
          <div className="mt-16 md:mt-20">
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--ink-55)',
                fontWeight: 600,
                marginBottom: 24,
              }}
            >
              {t('alsoLabel')}
            </div>
            <ul className="grid gap-x-8 gap-y-12 md:grid-cols-3 lg:gap-x-12">
              {rest.map((s, i) => (
                <li
                  key={s.id}
                  className="border-t pt-6"
                  style={{ borderColor: 'var(--ink-15)' }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize: 'clamp(1.5rem, 2vw + 0.5rem, 2rem)',
                      lineHeight: 1,
                      color: 'var(--accent)',
                      letterSpacing: '-0.02em',
                      marginBottom: 10,
                    }}
                  >
                    {String(i + 2).padStart(2, '0')}
                  </div>
                  <h3
                    className="text-xl font-bold leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-3 leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
                  >
                    {s.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
