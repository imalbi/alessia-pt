'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { prefersReducedMotion, subscribeToScrollFrame } from '@/lib/scroll-frame';

/**
 * Pixels per frame at rest. Paired with the `marq` duration in globals.css, which
 * this takes over from: the two are the same band before and after hydration, so
 * changing one without the other makes the track jump speed as the JS starts.
 * Being per-frame this is width-independent, while the CSS duration is not, so
 * the CSS number has to be retuned whenever the words change length.
 */
const BASE_SPEED = 0.65;

/** How much of the scroll velocity is added on top of the base speed. */
const PUSH = 0.34;

/** Degrees of lean at full push, and how fast the lean catches up. */
const MAX_SKEW = 14;
const SKEW_EASE = 0.12;

interface Props {
  children: ReactNode;
  className?: string;
}

/**
 * A looping track that the reader can push.
 *
 * The band keeps its own constant speed; scrolling adds momentum on top of it
 * and leans the track into the direction of travel. Scroll back up hard enough
 * and the sum goes positive, so the band slows, stops and reverses. That
 * reversal is the whole point: it is the half second in which the page shows it
 * is reading the same gesture the visitor is making.
 *
 * The CSS keyframes in globals.css stay the resting state. This component only
 * sets `data-pushed` once it is running, which is what switches the animation
 * off, so the server-rendered band is never still and never depends on
 * hydration to move.
 *
 * Hover still stops it dead rather than merely slowing it. A moving word is a
 * word you cannot read, and the push is not allowed to sneak past that rule.
 */
export function PushedTrack({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    el.dataset.pushed = 'on';

    // Half the track, because the content is rendered twice: wrapping on that
    // width is what makes the loop seamless.
    let half = el.scrollWidth / 2;
    const measure = () => {
      half = el.scrollWidth / 2;
    };

    let paused = false;
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    el.addEventListener('pointerenter', pause);
    el.addEventListener('pointerleave', resume);
    window.addEventListener('resize', measure);

    let x = 0;
    let skew = 0;
    let vel = 0;
    let lastY = window.scrollY;

    const unsubscribe = subscribeToScrollFrame(() => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      // Smoothed, so a trackpad flick reads as one push instead of a stutter,
      // and capped so a jump to an anchor cannot land the band on its side.
      vel += (delta - vel) * 0.28;
      vel = Math.max(-90, Math.min(90, vel));
      if (Math.abs(vel) < 0.02) vel = 0;

      if (half <= 0) measure();

      const push = paused ? 0 : vel * PUSH;
      if (!paused) {
        x += -BASE_SPEED - push;
        if (half > 0) {
          while (x <= -half) x += half;
          while (x > 0) x -= half;
        }
      }

      const target = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, -push * 0.4));
      skew += (target - skew) * SKEW_EASE;

      el.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
    });

    return () => {
      unsubscribe();
      el.removeEventListener('pointerenter', pause);
      el.removeEventListener('pointerleave', resume);
      window.removeEventListener('resize', measure);
      delete el.dataset.pushed;
      el.style.transform = '';
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
