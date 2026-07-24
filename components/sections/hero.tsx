import { useTranslations } from 'next-intl';
import { Scribble } from '@/components/primitives/scribble';
import { Button } from '@/components/ui/button';

/**
 * Hero. A Server Component on purpose: the entrance choreography lives in CSS
 * (`.hero-mask` / `.hero-rise-*` in globals.css, `animation-fill-mode: backwards`),
 * so the headline and the CTA are painted by the server and stay visible even if
 * the bundle never hydrates. Motion-in-JS would have serialised `opacity: 0`
 * into the markup and made the primary CTA depend on hydration.
 *
 * No photograph until a portrait of Alessia at work exists. The graduation
 * photo lives in About, where it reads as the credential it is.
 */
export function Hero() {
  const t = useTranslations('Hero');
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <section className="relative mx-auto max-w-screen-xl px-4 pt-24 pb-12 md:px-8 md:pt-32 md:pb-16 lg:px-12 lg:pt-40">
      <h1
        className="hero-mask max-w-[16ch] text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[0.95] font-extrabold tracking-tight"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
      >
        {t('proposition')}
        <span
          className="mt-[0.28em] block max-w-none text-[0.6em] leading-[1.02]"
          style={{ color: 'var(--ink-70)', fontWeight: 500 }}
        >
          {t('role')}
        </span>
      </h1>

      <div className="mt-1 w-[clamp(11rem,32vw,26rem)]">
        <Scribble kind="underline" />
      </div>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:items-end md:gap-16">
        <div>
          <p
            className="hero-rise-1 max-w-[46ch] text-[clamp(1.125rem,0.5vw+1rem,1.25rem)] leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('tagline')}
          </p>
          <div className="hero-rise-2 mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button asChild size="lg">
              <a href="#contact">{t('cta')}</a>
            </Button>
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-sm underline-offset-4 hover:underline"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
              >
                {t('ctaSecondary')}
              </a>
            )}
          </div>
        </div>

        {/* Credentials as text rather than as a photograph of a diploma. The
            thesis subject is the part that speaks to the half of the audience
            arriving with lower back pain, so it gets its own line. */}
        <div
          className="hero-rise-2 max-w-[34ch] border-t pt-4"
          style={{ borderColor: 'var(--gold)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--ink-55)',
              fontWeight: 600,
            }}
          >
            {t('credentialsLabel')}
          </p>
          <dl className="mt-3 grid gap-3">
            {(
              [
                ['credTitleLabel', 'credTitle'],
                ['credThesisLabel', 'credThesis'],
                ['credRegisterLabel', 'credRegister'],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dt
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 10,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-55)',
                    fontWeight: 600,
                  }}
                >
                  {t(label)}
                </dt>
                <dd
                  className="mt-0.5 text-[0.9375rem] leading-snug"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)', margin: 0 }}
                >
                  {t(value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
