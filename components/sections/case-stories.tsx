'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { caseStories as casesIt } from '@/content/it';
import { caseStories as casesEn } from '@/content/en';
import { subscribeToScrollFrame } from '@/lib/scroll-frame';
import { useMediaQuery } from '@/lib/use-media-query';
import { useReducedMotion } from '@/lib/use-reduced-motion';

/**
 * Below this the rail stays the drag rail it is today. A pinned section on a
 * phone is a trap: it eats the back gesture's worth of scrolling and gives no
 * way out but to keep going. The height floor is there because the pinned frame
 * has to hold a 440px card plus the heading without clipping.
 */
const PIN_MIN_WIDTH = 1024;
const PIN_MIN_HEIGHT = 700;

/** "Marta R." -> "MR". Used for the monogram in place of a photograph. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join('')
    .replace(/[^A-Za-zÀ-ÿ]/g, '')
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Case stories on a horizontal rail.
 *
 * Monograms, not portraits. The source mock filled these slots with
 * `picsum.photos` images: photographs of strangers, sitting beside real names,
 * real ages and real clinical quotes, under a caption that reads "shared with
 * consent". Shipping that would have invented the identity of four clients. The
 * initials keep the card's visual rhythm and claim nothing.
 *
 * The rail is a native scroll container, so trackpads, touch and keyboard all
 * work before any of the drag handling below exists. Pointer drag is added on
 * top for mouse users, who otherwise have no way to pan a horizontal list.
 *
 * On a desktop viewport the section pins instead: the rail stops being a thing
 * you operate and becomes a single camera move, one story at a time, driven by
 * the scroll you are already doing. Three cards behind a drag affordance are a
 * carousel, and a carousel is a decision asked of the reader; pinned, the same
 * three are a sequence the page walks them through. Everything narrower keeps
 * the drag rail, and so does reduced motion.
 */
export function CaseStories() {
  const t = useTranslations('Stories');
  const tp = useTranslations('Pointer');
  const locale = useLocale();
  const items = locale === 'en' ? casesEn : casesIt;

  const railRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  // False on the server, so the markup that ships is always the drag rail and
  // the pin is something the client opts into once it knows the viewport.
  const roomy = useMediaQuery(
    `(min-width: ${PIN_MIN_WIDTH}px) and (min-height: ${PIN_MIN_HEIGHT}px)`,
  );
  const reduced = useReducedMotion();
  const pinned = roomy && !reduced;

  useEffect(() => {
    const pin = pinRef.current;
    const rail = railRef.current;
    const track = trackRef.current;
    if (!pinned || !pin || !rail || !track) return;

    // The pan distance is the rail's own overflow. The scroll spent on it is a
    // little longer than that, so the rail moves slower than the page and the
    // pan reads as a camera move rather than a swipe.
    let overflow = 0;
    const measure = () => {
      track.style.transform = '';
      overflow = Math.max(0, rail.scrollWidth - rail.clientWidth);
      pin.style.height = `${window.innerHeight + overflow * 1.2}px`;
    };
    measure();
    window.addEventListener('resize', measure);

    const unsubscribe = subscribeToScrollFrame(() => {
      if (overflow <= 0) return;
      const rect = pin.getBoundingClientRect();
      const span = pin.offsetHeight - window.innerHeight;
      if (span <= 0 || rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = Math.min(1, Math.max(0, -rect.top / span));
      track.style.transform = `translate3d(${(-progress * overflow).toFixed(1)}px, 0, 0)`;
    });

    return () => {
      unsubscribe();
      window.removeEventListener('resize', measure);
      pin.style.height = '';
      track.style.transform = '';
    };
  }, [pinned]);

  return (
    <section
      id="stories"
      className="py-[clamp(80px,12vh,150px)]"
      data-pin={pinned ? 'on' : undefined}
    >
      <div ref={pinRef} className="stories-pin">
        <div className="stories-sticky">
          <div className="mx-auto flex max-w-[1500px] flex-wrap items-end justify-between gap-6 px-[5vw]">
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
                className="mt-4 text-[clamp(2.4rem,7vw,6rem)] leading-[0.92] font-extrabold"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.045em' }}
              >
                {t('line1')}
                <br />
                {t('line2')}
              </h2>
            </div>
            <p
              data-rev
              className="max-w-[38ch] text-base leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
            >
              {t('lead')}
              {/* Pinned there is nothing to drag: the hint has to name the gesture
              that actually moves the rail, which is the scroll already in hand. */}
              <span className="mono-cap mt-2.5 block" style={{ color: 'var(--ink-55)' }}>
                {pinned ? t('scrollHint') : t('dragHint')}
              </span>
            </p>
          </div>

          <div
            ref={railRef}
            className="drag-rail mt-[clamp(38px,6vh,70px)] px-[5vw] pb-2.5"
            // Snap positions align to the scrollport, which ignores the container's
            // own padding: without this the first card snaps flush to the viewport
            // edge on load and loses the 5vw gutter every other section keeps.
            style={{ scrollPaddingLeft: '5vw' }}
            // Focusable scroll region: a keyboard user needs to be able to reach the
            // rail and pan it with the arrow keys (WCAG 2.1.1), and a scroll
            // container with no focusable descendants is otherwise a dead end.
            // Pinned it stops being a scroll container, and a focus stop that
            // answers no key is worse than no focus stop: the page scroll moves the
            // rail instead, so the cards stay reachable from the keyboard either way.
            tabIndex={pinned ? undefined : 0}
            role="region"
            aria-label={t('railLabel')}
            // Only while it is a rail you drag. Pinned, the scroll moves it and
            // a disc that says "drag" would be an instruction for a gesture the
            // section no longer answers.
            data-cursor={pinned ? undefined : tp('drag')}
            onPointerDown={(e) => {
              const rail = railRef.current;
              if (!rail || pinned || e.pointerType === 'touch') return;
              drag.current = {
                active: true,
                startX: e.clientX,
                startLeft: rail.scrollLeft,
                moved: false,
              };
            }}
            onPointerMove={(e) => {
              const rail = railRef.current;
              if (!rail || pinned || !drag.current.active) return;
              const dx = e.clientX - drag.current.startX;
              // Threshold before engaging, so selecting a quote does not pan the rail.
              if (!drag.current.moved && Math.abs(dx) < 6) return;
              if (!drag.current.moved) {
                drag.current.moved = true;
                rail.setPointerCapture(e.pointerId);
                rail.style.cursor = 'grabbing';
              }
              rail.scrollLeft = drag.current.startLeft - dx;
            }}
            onPointerUp={(e) => {
              const rail = railRef.current;
              drag.current.active = false;
              if (!rail) return;
              if (rail.hasPointerCapture(e.pointerId)) rail.releasePointerCapture(e.pointerId);
              rail.style.cursor = '';
            }}
            onPointerCancel={() => {
              drag.current.active = false;
              if (railRef.current) railRef.current.style.cursor = '';
            }}
          >
            <ul ref={trackRef} className="flex w-max list-none gap-[clamp(18px,2.5vw,34px)]">
              {items.map((story) => (
                <li
                  key={story.id}
                  className="flex min-h-[440px] w-[min(84vw,470px)] flex-none flex-col gap-5 p-[clamp(24px,3vw,38px)]"
                  style={{ border: '1px solid var(--ink-15)', background: 'var(--paper-2)' }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="mono-cap" style={{ color: 'var(--ink-55)' }}>
                      {story.situation}
                    </span>
                    <span
                      className="text-[clamp(1.6rem,3vw,2.4rem)] leading-none font-bold whitespace-nowrap"
                      style={{
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '-0.04em',
                        color: 'var(--accent)',
                      }}
                    >
                      {story.duration}
                    </span>
                  </div>
                  <div
                    data-rev
                    data-grow
                    aria-hidden
                    className="h-0.5"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--gold), color-mix(in oklab, var(--gold) 15%, transparent))',
                    }}
                  />
                  <blockquote
                    className="flex-1 text-[clamp(1.08rem,1.5vw,1.35rem)] leading-snug font-medium"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
                  >
                    «{story.quote}»
                  </blockquote>
                  <footer
                    className="flex items-center gap-3 pt-4"
                    style={{ borderTop: '1px solid var(--ink-15)' }}
                  >
                    <span
                      aria-hidden
                      className="mono-cap flex h-9.5 w-9.5 flex-none items-center justify-center rounded-full"
                      style={{
                        background: 'var(--paper)',
                        border: '1px solid var(--gold)',
                        color: 'var(--ink-70)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {initials(story.name)}
                    </span>
                    <span
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
                    >
                      <span className="font-semibold" style={{ color: 'var(--ink)' }}>
                        {story.name}
                      </span>
                      , {story.age}
                    </span>
                  </footer>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p
        className="mono-cap mx-auto mt-6 max-w-[1500px] px-[5vw]"
        style={{ color: 'var(--ink-55)' }}
      >
        {t('disclosure')}
      </p>
    </section>
  );
}
