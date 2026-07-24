'use client';

import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';

const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? useLayoutEffect : useEffect;

interface Props {
  children: ReactNode;
  /** Optional delay (s) for sequencing inside a section. Default 0. */
  delay?: number;
  /** Slot for forwarding wrapper className (layout positioning). */
  className?: string;
}

/**
 * One-shot scroll reveal: a single block fades and slides up 12px on first
 * entry. Single movement per section, matching DESIGN.md's "due momenti
 * coreografati" philosophy.
 *
 * Additive: the server renders the block *visible*, and this effect hides it
 * only once JS is running. An earlier motion-based version serialised
 * `opacity: 0` into the SSR markup, which meant every section below the hero,
 * the contact form included, stayed blank until hydration finished. The page
 * has one job (get a message sent) and it must not depend on a bundle.
 *
 * The trigger is a bottom rootMargin rather than a threshold on purpose: a
 * threshold of 0.3 can never be met by a section taller than ~3x the viewport,
 * which is exactly what the services scale is on a phone.
 */
export function Reveal({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    el.dataset.reveal = 'hidden';
    if (delay) el.style.setProperty('--reveal-delay', `${delay}s`);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.dataset.reveal = 'shown';
        obs.disconnect();
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      delete el.dataset.reveal;
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
