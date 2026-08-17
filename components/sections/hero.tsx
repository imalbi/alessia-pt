import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Parallax } from '@/components/primitives/parallax';

/**
 * Hero. Server Component: the entrance is CSS with `animation-fill-mode:
 * backwards`, so the headline and the primary CTA are painted by the server and
 * stay readable even if the bundle never arrives. Only the background parallax
 * is a client island.
 *
 * The section pins itself to the dark surface regardless of the active theme
 * (see `[data-surface]` in globals.css). The photograph is a purple-lit still on
 * near-black; under the light theme it would either wash out or force dark text
 * over a dark plate. Kept dark, it reads as a full-bleed opening plate.
 *
 * Layout is bottom-anchored rather than centred: the type sits on the floor of
 * the viewport and the image takes the space above it, which keeps the asymmetry
 * DESIGN.md asks for instead of the centred hero preset.
 */
export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section
      id="top"
      data-surface="dark"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-[5vw] pt-36 pb-10 md:pt-40"
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Parallax speed={0.12} className="absolute inset-0">
          <Image
            src="/photos/hero-tools.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-[1.18] object-cover"
            style={{ objectPosition: '72% 46%' }}
          />
        </Parallax>
        {/* Two scrims, not one. The horizontal pass clears the left third for the
            headline; the vertical pass lands the section on the page background
            so the marquee below joins without a seam. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--paper) 0%, rgba(10,10,12,.86) 26%, rgba(10,10,12,.35) 56%, rgba(10,10,12,.1) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(0deg, var(--paper) 2%, rgba(10,10,12,.35) 26%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-[1500px]">
        <div className="mb-[clamp(24px,5vh,54px)] flex items-center gap-3.5">
          <span
            aria-hidden
            className="h-px w-[clamp(28px,5vw,72px)]"
            style={{ background: 'var(--gold)' }}
          />
          <span className="mono-cap" style={{ color: 'var(--ink-70)', letterSpacing: '0.24em' }}>
            {t('eyebrow')}
          </span>
        </div>

        {/* Sized against both axes. A pure `13.5vw` headline is three lines of
            ~170px on a 1280x580 laptop, which pushes the lead, the CTA and the
            credentials clean off a 100svh hero. The `20vh` term caps the type
            on short viewports without shrinking it on a tall desktop, where the
            vw term is the smaller of the two anyway.

            The 2.6rem floor is set by the longest line, not by taste. At the
            previous 3.4rem the floor beat `13.5vw` on any screen under ~403px
            and forced 54px type: "Ogni scelta" then no longer fit a 360px phone
            and wrapped, turning a three-line headline into four and breaking the
            per-line reveal. Raise this only after re-measuring the longest line
            at 360px. */}
        <h1
          className="text-[clamp(2.6rem,min(13.5vw,20vh),12.5rem)] leading-[0.82] font-extrabold uppercase"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.045em' }}
        >
          <span className="block overflow-hidden">
            <span className="line-mask block">{t('line1')}</span>
          </span>
          <span className="block overflow-hidden">
            <span className="line-mask block" style={{ '--d': '0.1s' } as React.CSSProperties}>
              {t('line2')}
            </span>
          </span>
          <span className="block overflow-hidden">
            {/* Third line carries the accent as an outline rather than a fill: the
                word lands at display size without spending a quarter of the fold
                on saturated violet.

                `paint-order` is doing real work here. Bricolage builds its glyphs
                from overlapping contours that are never merged, which is normal
                in a variable font and invisible while the type is filled. Stroke
                it and every internal join surfaces: E, G and N showed the bars
                and diagonals crossing their stems like construction lines, while
                O, S and U stayed clean. It is the font, not the weight, and 500
                shows it just as plainly as 800.

                Painting the stroke first and then the fill lets the fill cover
                those internal seams, leaving only the outer contour. The fill is
                `--paper` because this line sits in the scrimmed left third of the
                hero where the backdrop is effectively flat paper. Where
                `paint-order` is unsupported the declaration is ignored and we get
                exactly today's appearance back, so it degrades to no worse. */}
            <span
              className="line-mask block"
              style={
                {
                  '--d': '0.2s',
                  color: 'var(--paper)',
                  paintOrder: 'stroke fill',
                  WebkitTextStroke: '1.5px var(--accent)',
                } as React.CSSProperties
              }
            >
              {t('line3')}
            </span>
          </span>
        </h1>

        <div className="mt-[clamp(28px,5vh,56px)] flex flex-wrap items-end justify-between gap-[clamp(24px,5vw,64px)]">
          <div className="max-w-[46ch]">
            <p
              className="text-[clamp(1.02rem,1.15vw,1.28rem)] leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
            >
              {t('lead')}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3.5">
              <a
                href="#contact"
                data-cursor={t('cta')}
                className="inline-flex min-h-11 items-center gap-3 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-colors hover:bg-[color:var(--accent-15)]"
                style={{
                  border: '1px solid var(--accent)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {t('cta')}
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: 'var(--accent)' }}
                />
              </a>
            </div>
          </div>

          {/* Credentials as text, not as a photograph of a diploma. The thesis
              line moved to About, where the list has room.

              The register entry is commented out, not deleted: Alessia is not on
              the chinesiologi register yet, and claiming a professional
              registration she does not hold is not a copy detail. The strings
              are still in the message files under `credRegisterLabel` /
              `credRegister`, so restoring it is uncommenting this one line. */}
          <dl
            className="grid min-w-[min(100%,300px)] gap-3.5 pt-4"
            style={{ borderTop: '1px solid var(--gold)' }}
          >
            {(
              [
                ['credTitleLabel', 'credTitle'],
                // ['credRegisterLabel', 'credRegister'],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dt className="mono-cap" style={{ color: 'var(--ink-55)' }}>
                  {t(label)}
                </dt>
                <dd
                  className="mt-1 text-[14.5px] leading-snug"
                  style={{
                    color: 'var(--ink-70)',
                    fontFamily: 'var(--font-body)',
                    margin: 0,
                  }}
                >
                  {t(value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="relative z-[2] mt-[clamp(20px,4vh,44px)] flex justify-center">
        {/* The word says what to do, the stem says which way. Kept to one
            hairline and one chevron: an animated mouse-with-a-wheel glyph is
            the other thing that goes here, and it draws more attention than the
            instruction is worth. */}
        {/* An anchor, not a label: the hint told you to scroll and now it does
            it. `#about` is the first section, and `html` already carries
            `scroll-behavior: smooth` and the `scroll-padding-top` that clears
            the dock, so the destination lands where the nav links land and none
            of it costs a line of script.

            `py-2 -my-2` buys the 44px touch target back without moving anything:
            the padding grows the hit area, the negative margin hands the space
            back to the layout.

            Colour as a class rather than inline: an inline `style` outranks any
            stylesheet rule, so a `hover:` utility written against one never
            fires. */}
        <a
          href="#about"
          className="bob -my-2 flex flex-col items-center gap-2 py-2 text-[color:var(--ink-55)] no-underline transition-colors hover:text-[color:var(--ink)]"
        >
          <span className="mono-cap" style={{ letterSpacing: '0.2em' }}>
            {t('scrollHint')}
          </span>
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none" aria-hidden focusable="false">
            <path
              d="M4.5 0v13M1 9.5l3.5 3.5L8 9.5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
