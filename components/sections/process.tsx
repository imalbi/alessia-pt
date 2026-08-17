'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { processSteps as stepsIt } from '@/content/it';
import { processSteps as stepsEn } from '@/content/en';
import { subscribeToScrollFrame } from '@/lib/scroll-frame';
import { useReducedMotion } from '@/lib/use-reduced-motion';

/** Left gutter holding the rail, the dots and the travelling avatar. */
const GUTTER = 'clamp(44px, 5vw, 72px)';

/**
 * "Come lavoro" — the four phases, as a rail you descend.
 *
 * This is the section the redesign exists for. The product claim is presence:
 * that Alessia is in every phase rather than handing over a plan and leaving.
 * A four-card grid states that; a rail you travel, with her portrait riding the
 * fill and a card that keeps naming what she is doing right now, demonstrates
 * it. The layout is the argument.
 *
 * Scroll work is deliberately split. The rail fill and the avatar are written
 * imperatively every frame (transform and height only, no layout reads beyond
 * one getBoundingClientRect). The active step is React state, which changes at
 * most three times across the whole section, so the per-step styling stays
 * declarative instead of becoming a pile of manual style writes.
 */
export function Process() {
  const t = useTranslations('Process');
  const locale = useLocale();
  const steps = locale === 'en' ? stepsEn : stepsIt;

  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const activeRef = useRef(0);

  const [active, setActive] = useState(0);
  // Under reduced motion the rail renders complete and every step reads at full
  // strength: there is no travelling avatar to follow, so a half-lit list would
  // just be unexplained low contrast.
  const live = !useReducedMotion();

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    if (!live) {
      if (fillRef.current) fillRef.current.style.height = '100%';
      return;
    }

    let avatarY = 0;

    return subscribeToScrollFrame(() => {
      const tops = stepRefs.current.map((el) => (el ? el.offsetTop + 12 : 0));
      if (tops.length === 0) return;

      const first = tops[0] ?? 0;
      // The travel ends at the foot of the track, not at the last dot. Clamping
      // to the final step's `offsetTop` stopped the fill the moment step 04
      // began, leaving the whole height of its text with an unfilled rail
      // beside it. The track is inset 14px top and bottom (`top-3.5 bottom-3.5`
      // on both the track and this fill), so its end sits at that same inset
      // from the rail's full height.
      const railEnd = rail.clientHeight - 14;

      // Reading height, deliberately fixed rather than derived from the card.
      //
      // Deriving it looks right on paper: line the head of the fill up with the
      // card that names the phase. In practice the card is at 98% of a phone
      // viewport and 68-73% of a desktop one, and a focus line down there makes
      // a step "current" as soon as it peeks in from below. Measured: with
      // "Ti scrivo il percorso" at eye level the card already announced phase
      // 03. Naming a phase the visitor has not reached is worse than the two
      // sitting at different heights.
      //
      // 0.48 rather than the original 0.42: the phase turns over a little
      // sooner, which is what the misalignment really reads as, while staying
      // inside the band where the step at eye level is the step being named.
      const focus = window.innerHeight * 0.48;

      const local = Math.max(first, Math.min(railEnd, focus - rail.getBoundingClientRect().top));

      if (fillRef.current) fillRef.current.style.height = `${Math.max(0, local - 14)}px`;

      // Eased follow rather than a hard bind, so the portrait settles into each
      // station instead of twitching with every scroll delta. An exponential
      // ease only ever approaches its target, so it is snapped once it is
      // within half a pixel: otherwise this writes a new transform on every
      // frame forever, which keeps the compositor and rAF permanently busy on
      // a page that is otherwise idle.
      const target = local - 28;
      avatarY = Math.abs(target - avatarY) < 0.5 ? target : avatarY + (target - avatarY) * 0.14;
      if (avatarRef.current) {
        avatarRef.current.style.transform = `translate3d(0, ${avatarY}px, 0)`;
      }

      let next = 0;
      tops.forEach((top, i) => {
        if (local >= top - 40) next = i;
      });
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    });
  }, [live]);

  const current = steps[active] ?? steps[0];

  /**
   * The live card, in two placements.
   *
   * `inline` sits in the sticky left column, which only works from `lg`. On a
   * narrow screen that column stacks *above* the rail: the card occupies roughly
   * 100px against a 1200px rail, so it has scrolled off the top long before
   * phases 02 to 04 fire. It would spend its life updating where nobody can see
   * it, showing "Fase 01" and nothing else.
   *
   * `pinned` is the mobile answer. Stuck to the bottom of the viewport for the
   * length of the rail, it finally does the job it was built for: naming what
   * Alessia is doing at the phase you are actually reading.
   *
   * Both are `aria-hidden` and the phase is announced once from the single live
   * region below. Two live regions would announce every change twice.
   */
  const presenceCard = (variant: 'inline' | 'pinned') => (
    <div
      aria-hidden
      className={
        variant === 'inline'
          ? 'mt-[clamp(30px,4vh,48px)] hidden max-w-[420px] items-center gap-4 rounded-2xl p-[18px] lg:flex'
          : 'sticky z-10 flex items-center gap-3.5 rounded-2xl p-3 lg:hidden'
      }
      style={
        variant === 'inline'
          ? {
              border: '1px solid var(--ink-15)',
              background: 'color-mix(in oklab, var(--paper) 55%, transparent)',
            }
          : {
              // Escapes the rail's left gutter so the card spans the full width.
              marginLeft: `calc(-1 * ${GUTTER})`,
              bottom: 'max(1rem, env(safe-area-inset-bottom))',
              border: '1px solid var(--ink-15)',
              // Opaque enough to sit over the timeline it is describing.
              background: 'color-mix(in oklab, var(--paper) 92%, transparent)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 18px 40px -24px color-mix(in oklab, var(--ink) 60%, transparent)',
            }
      }
    >
      <span
        className={
          variant === 'pinned' ? 'relative h-11 w-11 flex-none' : 'relative h-14 w-14 flex-none'
        }
      >
        {live && (
          <span
            className="halo absolute -inset-1.5 rounded-full"
            style={{ border: '1px solid var(--accent)' }}
          />
        )}
        <span
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{ border: '1px solid var(--accent)', background: 'var(--paper)' }}
        >
          <Image
            src="/photos/laurea.jpg"
            alt=""
            width={56}
            height={56}
            className="h-full w-full object-cover"
            style={{ objectPosition: '50% 22%' }}
          />
        </span>
      </span>
      <span className="grid min-w-0 gap-1">
        <span className="mono-cap" style={{ color: 'var(--ink-55)' }}>
          {t('phaseLabel', { num: current?.num ?? '01' })}
        </span>
        <span
          className="text-[clamp(1rem,1.5vw,1.22rem)] leading-tight font-semibold"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
        >
          {current?.presence}
        </span>
      </span>
    </div>
  );

  return (
    <section
      id="process"
      className="px-[5vw] py-[clamp(70px,11vh,140px)]"
      style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--ink-15)' }}
    >
      <div className="mx-auto grid max-w-[1500px] items-start gap-[clamp(38px,6vw,86px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="lg:sticky lg:top-32">
          <p
            data-rev
            className="mono-cap"
            style={{ color: 'var(--accent)', letterSpacing: '0.22em' }}
          >
            {t('eyebrow')}
          </p>
          <h2
            data-rev
            className="mt-4 max-w-[12ch] text-[clamp(2.2rem,5.4vw,4.6rem)] leading-[0.94] font-extrabold whitespace-pre-line"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.045em' }}
          >
            {t('heading')}
          </h2>
          <p
            data-rev
            className="mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('lead')}
          </p>

          {presenceCard('inline')}

          {/* The single announcement for the whole section. Polite: the text
              swaps as the visitor scrolls and an assertive region would cut a
              screen reader off mid-sentence. */}
          <span aria-live="polite" className="sr-only">
            {t('phaseLabel', { num: current?.num ?? '01' })} · {current?.presence}
          </span>
        </div>

        <div ref={railRef} className="relative" style={{ paddingLeft: GUTTER }}>
          <div
            aria-hidden
            className="absolute top-3.5 bottom-3.5 w-0.5"
            style={{ left: 11, background: 'var(--ink-15)' }}
          />
          <div
            ref={fillRef}
            aria-hidden
            className="absolute top-3.5 w-0.5"
            style={{
              left: 11,
              height: 0,
              background: 'linear-gradient(180deg, var(--accent), var(--gold))',
              boxShadow: '0 0 18px color-mix(in oklab, var(--accent) 50%, transparent)',
            }}
          />
          {live && (
            /* Desktop only. On a phone it collides with the pinned card in two
               ways: both carry Alessia's portrait, so when the card lands at the
               end of the rail you get the same face twice side by side; and the
               rail's left gutter is only ~19px there, so an avatar at `left:-16`
               puts its halo at -3.5px and the ring is clipped by the screen
               edge. The pinned card already carries her presence on mobile. */
            <div
              ref={avatarRef}
              aria-hidden
              className="absolute top-0 z-[2] hidden h-14 w-14 lg:block"
              style={{ left: -16, willChange: 'transform' }}
            >
              <span
                className="halo absolute -inset-[7px] rounded-full"
                style={{ border: '1px solid var(--accent)' }}
              />
              <span
                className="absolute inset-0 overflow-hidden rounded-full"
                style={{
                  border: '1.5px solid var(--accent)',
                  background: 'var(--paper)',
                  boxShadow:
                    '0 12px 34px -12px color-mix(in oklab, var(--accent) 90%, transparent)',
                }}
              >
                <Image
                  src="/photos/laurea.jpg"
                  alt=""
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: '50% 22%' }}
                />
              </span>
            </div>
          )}

          <ol className="grid list-none gap-[clamp(48px,9vh,110px)]">
            {steps.map((step, i) => {
              const reached = !live || i <= active;
              const isCurrent = !live || i === active;
              return (
                <li
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  data-step
                  className="relative"
                  /* No container opacity. The mock dimmed inactive steps to
                     0.32, which multiplies into every child colour: ink-55 body
                     copy landed at 1.64:1 and the accent numeral at 1.52:1,
                     both far under AA, and axe fails the page on it. The state
                     is carried by colour, the dot and its ring instead, so the
                     text on screen stays readable whether or not it is the step
                     you are currently on. */
                >
                  <span
                    aria-hidden
                    data-step-dot
                    className="absolute h-3 w-3 rounded-full"
                    style={{
                      left: `calc(-1 * ${GUTTER} + 6px)`,
                      top: 12,
                      background: reached ? 'var(--accent)' : 'var(--ink-30)',
                      boxShadow: isCurrent
                        ? '0 0 0 5px color-mix(in oklab, var(--accent) 16%, transparent)'
                        : 'none',
                      transform: isCurrent ? 'scale(1.2)' : 'scale(1)',
                    }}
                  />
                  <div className="flex flex-wrap items-baseline gap-3.5">
                    <span
                      className="mono-cap"
                      style={{ color: 'var(--accent)', fontSize: 10.5, letterSpacing: '0.18em' }}
                    >
                      {step.num}
                    </span>
                    <span className="mono-cap" style={{ color: 'var(--ink-55)' }}>
                      {step.meta}
                    </span>
                  </div>
                  <h3
                    data-step-title
                    className="mt-3 text-[clamp(1.55rem,3.4vw,2.7rem)] leading-tight font-bold"
                    style={{
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '-0.035em',
                      // ink-55 is the floor: ~5.2:1 on paper-2, so even the
                      // furthest-ahead step clears AA.
                      color: isCurrent ? 'var(--ink)' : reached ? 'var(--ink-70)' : 'var(--ink-55)',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    data-step-body
                    className="mt-3.5 max-w-[48ch] text-[1.02rem] leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: isCurrent ? 'var(--ink-70)' : 'var(--ink-55)',
                    }}
                  >
                    {step.body}
                  </p>
                  {/* Only when the card cannot do this job. `step.presence` is
                      the card's whole reason to exist, so printing it inside the
                      step as well says the same sentence twice: the mock did
                      exactly that, and with the card pinned to the bottom of a
                      phone screen the two copies land 30px apart.

                      Under reduced motion the card is frozen on phase 01, so
                      each step carries its own line again and nothing is lost. */}
                  {!live && (
                    <p
                      className="mono-cap mt-4 inline-flex items-center pl-3"
                      style={{ color: 'var(--ink-55)', borderLeft: '1px solid var(--gold)' }}
                    >
                      {step.presence}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Last child of the rail on purpose. A bottom-sticky element pins
              while its natural position is still below the viewport, so sitting
              at the end of a 1200px rail keeps it stuck to the bottom of the
              screen for the whole descent, then lands as the rail finishes. */}
          {presenceCard('pinned')}
        </div>
      </div>
    </section>
  );
}
