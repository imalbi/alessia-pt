'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

/**
 * Reactive `prefers-reduced-motion`.
 *
 * `useSyncExternalStore` rather than state-plus-effect: the server snapshot is
 * false, so SSR always emits the animated markup and the client corrects on
 * hydration without a cascading render. It also picks up the visitor changing
 * the OS setting mid-session, which a one-shot read in an effect never would.
 *
 * Use this when the preference has to change what is *rendered*. For effects
 * that only decide whether to attach a scroll listener, the one-shot
 * `prefersReducedMotion()` in lib/scroll-frame is enough.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
