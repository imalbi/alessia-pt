'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Reactive media query.
 *
 * Same shape and the same reasons as `useReducedMotion`: the server snapshot is
 * false, so SSR always emits the un-enhanced markup and the client corrects on
 * hydration without a cascading render. It also keeps up with a resize or a
 * rotation, which a one-shot read on mount never would.
 *
 * Use this when the answer has to change what is *rendered*. An effect that only
 * decides whether to attach a listener can read `matchMedia` directly.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
