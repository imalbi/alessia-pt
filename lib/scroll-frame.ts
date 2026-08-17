type Frame = () => void;

const subscribers = new Set<Frame>();
let handle = 0;

function loop() {
  for (const fn of subscribers) fn();
  handle = requestAnimationFrame(loop);
}

/**
 * Single shared requestAnimationFrame loop.
 *
 * The redesign drives four independent scroll effects (progress bar, hero and
 * watermark parallax, the process timeline, the service stack). Each one owning
 * its own rAF would mean four callbacks racing to read layout every frame, and
 * four separate chances to leak a loop on unmount. One loop with a subscriber
 * set keeps the per-frame budget in a single place and stops entirely when the
 * last subscriber goes away.
 *
 * Callers are responsible for cheap work: read geometry, write transforms, no
 * layout thrash in between.
 */
export function subscribeToScrollFrame(fn: Frame): () => void {
  subscribers.add(fn);
  if (!handle) handle = requestAnimationFrame(loop);
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0 && handle) {
      cancelAnimationFrame(handle);
      handle = 0;
    }
  };
}

/** True when the visitor asked for reduced motion. Safe before hydration. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
