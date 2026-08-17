'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion, subscribeToScrollFrame } from '@/lib/scroll-frame';

/**
 * Reading-progress hairline pinned to the top of the viewport.
 *
 * The accent-to-gold gradient is a deliberate exception to what DESIGN.md's
 * forbidden list used to say: it is 2px tall, decorative, and carries no text,
 * so the "no violet-to-gold gradient" rule (written to stop gradient headlines
 * and CTA fills) does not buy anything here. Recorded in DESIGN.md.
 *
 * Hidden entirely under reduced motion: a bar that tracks scroll is pure motion
 * feedback, and there is no static form of it worth rendering.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    return subscribeToScrollFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${ratio})`;
    });
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5"
      style={{ contain: 'strict' }}
    >
      <div
        ref={ref}
        className="h-full w-full origin-left"
        style={{
          transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, var(--accent), var(--gold))',
        }}
      />
    </div>
  );
}
