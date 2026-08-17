'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/scroll-frame';

const ATTRS = ['rev', 'fill', 'grow'] as const;
const SELECTOR = '[data-rev],[data-fill],[data-grow]';

/**
 * Arms every scroll-reveal on the page from one observer.
 *
 * Server components mark elements with a bare `data-rev` / `data-fill` /
 * `data-grow`. A bare attribute matches no hidden rule in globals.css, so the
 * server output is the fully visible page: no JS, no blank sections. This
 * effect switches each one to "off" and lets the observer flip it to "in" as it
 * enters. That ordering is deliberate and was a real bug once, when hidden
 * state was serialised into SSR and the contact form stayed invisible whenever
 * the bundle failed.
 *
 * One observer for the whole document rather than a wrapper component per
 * block: the redesign reveals individual lines, list rows and rules, and a
 * wrapper per element would mean dozens of extra client components.
 */
export function RevealScope() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (nodes.length === 0) return;

    for (const el of nodes) {
      for (const attr of ATTRS) {
        if (el.dataset[attr] === '') el.dataset[attr] = 'off';
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          for (const attr of ATTRS) {
            if (el.dataset[attr] === 'off') el.dataset[attr] = 'in';
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    for (const el of nodes) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return null;
}
