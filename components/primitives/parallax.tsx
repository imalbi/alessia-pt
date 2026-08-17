'use client';

import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { prefersReducedMotion, subscribeToScrollFrame } from '@/lib/scroll-frame';

/**
 * Extends the div props rather than declaring a closed set. An earlier version
 * accepted only children/speed/className/style, which meant `aria-hidden` on
 * the decorative watermarks was silently dropped and screen readers announced
 * a 20rem outlined "CONTATTAMI" as content.
 */
interface Props extends ComponentPropsWithoutRef<'div'> {
  /** Fraction of the element's offset from viewport centre, 0.05-0.15 reads well. */
  speed?: number;
}

/**
 * Depth offset tied to scroll position.
 *
 * Only ever applied to elements that are oversized on purpose (the hero still
 * is 118% tall, the watermarks bleed past their section), so the translate can
 * never expose an edge. Skipped wholesale under reduced motion, and skipped per
 * frame when the element is far outside the viewport, which keeps the shared
 * frame budget flat on a long page.
 */
export function Parallax({ children, speed = 0.1, className, style, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    return subscribeToScrollFrame(() => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      const offset = rect.top + rect.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${-offset * speed}px, 0)`;
    });
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', ...style }} {...rest}>
      {children}
    </div>
  );
}
