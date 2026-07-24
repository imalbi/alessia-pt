'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

/** Opacity of a station the scale has not reached yet. Never 0: an inactive
 *  offering still has to be readable for anyone scrolling slowly, or for anyone
 *  who lands mid-section from an anchor link. The scale marks focus, it does
 *  not gate the content. */
const FLOOR = 0.45;

/** How much scroll progress a station takes to come up to full. */
const RAMP = 0.14;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

interface Props {
  children: ReactNode;
  className?: string;
}

/**
 * The presence scale: a gold hairline that fills top-down as the section
 * scrolls, lighting each offering as it passes its tick.
 *
 * Additive by construction. The server ships every station at full opacity and
 * the rail at scaleY(0); this component dims the stations on mount and scroll
 * brings them back. If the bundle never loads, or JS throws, the reader gets a
 * complete, legible list and only loses a decoration.
 *
 * The rail itself is `aria-hidden` and animates on `transform` only.
 */
export function ServiceScale({ children, className }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const stations = gsap.utils.toArray<HTMLElement>('[data-station]', el);
        const fill = el.querySelector<HTMLElement>('[data-scale-fill]');
        if (!fill || stations.length === 0) return;

        gsap.set(stations, { opacity: FLOOR });

        const setFill = gsap.quickSetter(fill, 'scaleY');
        const setOpacity = stations.map((s) => gsap.quickSetter(s, 'opacity'));

        // Each station's position along the rail, 0 to 1. Measured on refresh
        // rather than per frame so scrolling never triggers a layout read.
        let anchors: number[] = [];
        const measure = () => {
          const height = el.offsetHeight || 1;
          anchors = stations.map((s) => (s.offsetTop + s.offsetHeight * 0.28) / height);
        };

        const progress = { value: 0 };
        const render = () => {
          setFill(progress.value);
          for (let i = 0; i < stations.length; i++) {
            const lit = clamp01((progress.value - (anchors[i] ?? 0) + RAMP) / RAMP);
            setOpacity[i]?.(FLOOR + (1 - FLOOR) * lit);
          }
        };

        gsap.to(progress, {
          value: 1,
          ease: 'none',
          onUpdate: render,
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: 0.4,
            invalidateOnRefresh: true,
            onRefresh: () => {
              measure();
              render();
            },
          },
        });

        // Web fonts land after first paint and reflow the stations, which moves
        // every anchor. Re-measure once they settle.
        void document.fonts?.ready.then(() => ScrollTrigger.refresh());

        // quickSetter writes straight to style and is therefore invisible to
        // the gsap context, so a revert would leave the last dimmed values
        // stuck on the page. That happens for real when someone turns on
        // reduced motion with the tab already open: the condition stops
        // matching, gsap tears this context down, and without the line below
        // the offerings stay at FLOOR forever.
        return () => {
          stations.forEach((s) => s.style.removeProperty('opacity'));
          fill.style.transform = 'scaleY(0)';
        };
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className} style={{ position: 'relative' }}>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 1,
          background: 'var(--ink-15)',
        }}
      >
        <span
          data-scale-fill
          style={{
            position: 'absolute',
            inset: 0,
            display: 'block',
            background: 'var(--gold)',
            transform: 'scaleY(0)',
            transformOrigin: 'top',
            willChange: 'transform',
          }}
        />
      </span>
      {children}
    </div>
  );
}
