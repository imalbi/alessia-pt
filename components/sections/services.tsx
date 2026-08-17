'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { services as servicesIt } from '@/content/it';
import { services as servicesEn } from '@/content/en';
import { prefersReducedMotion, subscribeToScrollFrame } from '@/lib/scroll-frame';

/** Pin offset of the first card, matched to `scroll-padding-top` in globals.css. */
const STICK_TOP = 96;
/** Each card pins this far below the one before it, so the deck edges show. */
const DECK_OFFSET = 10;
/** Scale removed per card of depth. Four cards bottom out at 0.91. */
const DEPTH_SCALE = 0.03;

/**
 * Services as a deck. Each card pins slightly lower than the last, so the ones
 * underneath keep a visible top edge, and recedes as cards land on top of it.
 * Replaces the four-up grid, which DESIGN.md rules out anyway ("no identical
 * card grid"), and buys each service the full width to state itself.
 *
 * Three things make this work, and all three are answers to bugs the earlier
 * versions had:
 *
 * 1. Heights are equalised in JS. Every card is sticky inside the same
 *    containing block, and a sticky element is released when that block's bottom
 *    minus *its own height* passes the pin. Unequal cards therefore release at
 *    different moments: on a phone the first card ran 82px taller than the rest
 *    and visibly detached early, sliding up behind its neighbours. A CSS
 *    `min-height` only papers over this when the guess happens to exceed the
 *    tallest card, so the height is measured instead.
 *
 * 2. Depth is expressed with `transform` only. The source mock faded and blurred
 *    the outgoing card. Fading is actively wrong here: the cards overlap, so a
 *    translucent one shows the card underneath and you get two services' worth
 *    of text superimposed. Blur repaints a viewport-sized surface every frame.
 *    Scale is compositor-only and cannot leak what is behind it.
 *
 * 3. The pins are staggered. With every card at the same offset the stack is
 *    invisible until one slides over another; 10px apart, the accumulation is
 *    legible at a glance and each hairline top border reads as a sheet edge.
 */
export function Services() {
  const t = useTranslations('Services');
  const locale = useLocale();
  const items = locale === 'en' ? servicesEn : servicesIt;

  const wrapRef = useRef<HTMLDivElement>(null);
  /** Sticky elements: measured for scroll position, never transformed. */
  const articleRefs = useRef<(HTMLElement | null)[]>([]);
  /** Inner sheets: transformed and height-equalised, never measured for scroll. */
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Equalise the sheets so all four release from the pin together.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const equalise = () => {
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
      if (cards.length === 0) return;
      // Release first, then measure, then apply. Reading a height while a
      // previous floor is still set would just measure the old floor back.
      for (const card of cards) card.style.minHeight = '0px';
      let tallest = 0;
      // `offsetHeight`, not `getBoundingClientRect().height`. These cards carry a
      // scale transform, and the rect reports the *visual* box: measuring a card
      // at scale(0.91) yields 91% of its real height, so the floor would shrink a
      // little more on every pass. `offsetHeight` is the layout height and
      // ignores transforms entirely.
      for (const card of cards) tallest = Math.max(tallest, card.offsetHeight);
      const floor = `${Math.ceil(tallest)}px`;
      for (const card of cards) card.style.minHeight = floor;
    };

    // Width is the only thing that can change the natural height of a card, and
    // guarding on it matters: the observer watches an element whose height this
    // very callback changes, so reacting to height would loop forever.
    let lastWidth = -1;
    const observer = new ResizeObserver((entries) => {
      const width = Math.round(entries[0]?.contentRect.width ?? 0);
      if (width === lastWidth) return;
      lastWidth = width;
      equalise();
    });
    observer.observe(wrap);

    // Bricolage swaps in after first paint and reflows every card.
    document.fonts?.ready.then(equalise).catch(() => {});

    return () => observer.disconnect();
  }, [items.length, locale]);

  // Depth. Skipped under reduced motion, where the deck simply sits flat.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    return subscribeToScrollFrame(() => {
      const articles = articleRefs.current;
      const cards = cardRefs.current;
      const span = window.innerHeight * 0.5;

      // Read every position first, then write every transform. Interleaving the
      // two would force a layout on each iteration.
      const arrived: number[] = [];
      for (let i = 0; i < articles.length; i += 1) {
        const article = articles[i];
        if (!article) {
          arrived.push(0);
          continue;
        }
        const pin = STICK_TOP + i * DECK_OFFSET;
        const distance = pin + span - article.getBoundingClientRect().top;
        arrived.push(Math.min(1, Math.max(0, distance / span)));
      }

      for (let i = 0; i < cards.length; i += 1) {
        const card = cards[i];
        if (!card) continue;
        // Depth is how many cards are stacked on top of this one, counted
        // fractionally so the recession tracks the scroll rather than snapping.
        let depth = 0;
        for (let j = i + 1; j < arrived.length; j += 1) depth += arrived[j] ?? 0;
        card.style.transform =
          depth > 0.001 ? `scale(${(1 - depth * DEPTH_SCALE).toFixed(4)})` : '';
      }
    });
  }, [items.length]);

  return (
    <section
      id="services"
      className="pt-[clamp(70px,10vh,120px)]"
      style={{ borderTop: '1px solid var(--ink-15)' }}
    >
      <div className="mx-auto max-w-[1500px] px-[5vw]">
        <p
          data-rev
          className="mono-cap"
          style={{ color: 'var(--accent)', letterSpacing: '0.22em' }}
        >
          {t('eyebrow')}
        </p>
        <h2
          data-rev
          className="mt-4 max-w-[16ch] text-[clamp(2.4rem,7vw,6rem)] leading-[0.92] font-extrabold"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.045em' }}
        >
          {t('heading')}
        </h2>
        <p
          data-rev
          className="mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
        >
          {t('leadNote')} {t('lead')}
        </p>
      </div>

      <div ref={wrapRef} className="mt-[clamp(50px,8vh,90px)]">
        {items.map((service, i) => (
          <article
            key={service.id}
            ref={(el) => {
              articleRefs.current[i] = el;
            }}
            className="sticky px-[5vw]"
            style={{ top: STICK_TOP + i * DECK_OFFSET }}
          >
            {/* No CSS min-height floor on purpose: the equalising effect sets one
                inline. A guessed `44vh` floor would be a tall empty gap under
                every short card for the whole time JS has not run yet, and the
                un-scripted page is a perfectly good flowing list without it. */}
            <div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="mx-auto max-w-[1500px] pt-[clamp(28px,4vw,52px)] pb-[clamp(40px,6vw,70px)]"
              style={{
                borderTop: '1px solid var(--ink-15)',
                background: 'var(--paper)',
                transformOrigin: 'center top',
                willChange: 'transform',
              }}
            >
              <div className="grid items-start gap-[clamp(20px,4vw,64px)] md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3">
                    {/* A mark, not a numeral. The four cards are alternatives a
                        reader picks between, and 01-04 implied an order to work
                        through: the deck is not the four-phase process, which is
                        the section above. The dot carries the accent the outlined
                        numerals used to carry, so the row still opens in violet. */}
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                    <span className="mono-cap" style={{ color: 'var(--ink-55)' }}>
                      {service.mode}
                    </span>
                  </div>
                  <h3
                    className="mt-5 max-w-[16ch] text-[clamp(1.5rem,2.8vw,2.5rem)] leading-tight font-bold"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
                  >
                    {service.title}
                  </h3>
                </div>
                <div className="grid gap-5">
                  <p
                    className="max-w-[52ch] text-[1.02rem] leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
                  >
                    {service.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="h-px flex-1"
                      style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
                    />
                    <a
                      href="#contact"
                      // Four links reading "Chiedi info" are ambiguous out of
                      // context, which is exactly how a screen reader lists them.
                      aria-label={t('enquireAria', { service: service.title })}
                      data-cursor={t('enquire')}
                      className="mono-cap inline-flex min-h-11 items-center whitespace-nowrap transition-colors hover:text-[color:var(--ink)]"
                      style={{ color: 'var(--ink-70)' }}
                    >
                      {t('enquire')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
        {/* Scroll runway: without it the last card unpins the moment it lands and
            the deck ends on a jolt instead of settling. */}
        <div aria-hidden className="h-[36vh]" />
      </div>
    </section>
  );
}
