import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Parallax } from '@/components/primitives/parallax';

const CREDS = ['degree', 'thesis', 'training'] as const;

/**
 * About. Two columns: a sticky portrait that holds while the reading column
 * scrolls past it. Server Component; the only client piece is the photograph's
 * depth offset.
 *
 * The heading animates from outline to solid (`data-fill`) rather than fading
 * in. It reads as the subject coming into focus, and it reuses the stroke
 * treatment from the hero's third line so the two register as the same gesture
 * instead of two unrelated effects.
 */
export function About() {
  const t = useTranslations('About');

  return (
    <section id="about" className="px-[5vw] py-[clamp(80px,12vh,160px)]">
      <div className="mx-auto grid max-w-[1500px] items-start gap-[clamp(36px,6vw,90px)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="md:sticky md:top-32">
          <figure data-rev className="m-0">
            {/* Empty label on purpose: the disc opens over the portrait without
                putting a word on Alessia's face. */}
            <div
              data-cursor=""
              className="relative aspect-[2/3] overflow-hidden"
              style={{ border: '1px solid var(--ink-15)', background: 'var(--paper-2)' }}
            >
              <Parallax speed={0.07} className="absolute inset-0">
                <Image
                  src="/photos/about-laurea.jpg"
                  alt={t('credPhotoAlt')}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="scale-[1.12] object-cover"
                  /* Graded, not just dimmed. The graduation photo is a bright
                     daytime shot carrying a lot of warm chroma (roses, a yellow
                     tram, brick), and DESIGN.md holds gold as the page's single
                     warm element. A light hand on purpose: at 80% saturation the
                     warm notes stop competing with the gold without the photo
                     turning into a duotone, and Alessia still reads as a person
                     on a good day rather than an archive document. */
                  style={{ filter: 'saturate(0.8) contrast(1.04) brightness(0.94)' }}
                />
              </Parallax>
              {/* Violet cast across the top-left of the frame so the photograph
                  belongs to the palette instead of sitting in it as a neutral
                  rectangle. Screen blend, so it lifts rather than tints. */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(90% 70% at 30% 20%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 70%)',
                  mixBlendMode: 'screen',
                }}
              />
            </div>
          </figure>
        </div>

        <div>
          <p
            data-rev
            className="mono-cap"
            style={{ color: 'var(--accent)', letterSpacing: '0.22em' }}
          >
            {t('eyebrow')}
          </p>
          <h2
            data-rev
            data-fill
            className="mt-4 text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.94] font-extrabold"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.04em' }}
          >
            {t('line1')}
            <br />
            {t('line2')}
            <br />
            {t('line3')}
          </h2>

          <div className="mt-9 grid max-w-[56ch] gap-5">
            <p
              data-rev
              className="text-[clamp(1.05rem,1.2vw,1.3rem)] leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--ink)' }}
            >
              {t('intro')}
            </p>
            <p
              data-rev
              className="text-[1.02rem] leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
            >
              {t('scope')}
            </p>
            <p
              data-rev
              className="text-[1.02rem] leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
            >
              {t('method')}
            </p>
          </div>

          {/* Credentials as a definition rail rather than a prose sentence: the
              qualification and what it is sit side by side and stay scannable,
              and the rules give the column a spine the paragraphs above lack. */}
          <dl className="mt-11 grid" style={{ borderTop: '1px solid var(--ink-15)' }}>
            {CREDS.map((key) => (
              <div
                key={key}
                data-rev
                className="flex items-baseline justify-between gap-5 py-[18px]"
                style={{ borderBottom: '1px solid var(--ink-15)' }}
              >
                <dt
                  className="text-[clamp(1.05rem,1.6vw,1.45rem)] font-semibold"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t(`${key}Term`)}
                </dt>
                <dd className="mono-cap m-0 text-right" style={{ color: 'var(--ink-55)' }}>
                  {t(`${key}Detail`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
