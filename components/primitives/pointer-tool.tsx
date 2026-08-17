'use client';

import { useEffect, useRef } from 'react';
import { subscribeToScrollFrame } from '@/lib/scroll-frame';
import { useMediaQuery } from '@/lib/use-media-query';
import { useReducedMotion } from '@/lib/use-reduced-motion';

/** Resting, and over anything clickable. Both are circles. */
const REST = 12;
const HOVER = 34;

/** A labelled zone opens a pill measured from its own text, so a longer string
 *  in another language widens the shape instead of running past the edge of it.
 *  Without a label it opens as a plain circle. */
const OPEN_HEIGHT = 40;
const OPEN_PADDING = 36;
const OPEN_CIRCLE = 76;

/** Everything that answers a click and therefore deserves an acknowledgement. */
const INTERACTIVE = 'a[href], button, select, summary, label, [role="button"], [tabindex]';

/** Where the system cursor is information and the disc has to step aside. */
const FIELDS = 'input, textarea, select, [contenteditable], [role="combobox"]';

/**
 * The pointer as a tool.
 *
 * A violet disc trails the cursor and opens into a labelled pill over anything
 * carrying `data-cursor`. An empty value opens the disc without a word, which is
 * what a photograph wants: acknowledgement, not an instruction.
 *
 * Three things this deliberately does not do.
 *
 * It never mounts on a coarse pointer: on a phone there is nothing to trail, and
 * the whole component is skipped rather than rendered and hidden.
 *
 * It never mounts under reduced motion. A disc that eases behind the real
 * cursor is exactly the kind of lag a motion-sensitive visitor asked not to get.
 *
 * It gives the system cursor back over the form fields. The text caret and the
 * select arrow are information, not decoration, and swapping them for a violet
 * disc is the fastest way to make someone fill a field in wrong. The exception
 * is the field itself, not the section around it.
 */
export function PointerTool() {
  const discRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  useEffect(() => {
    const disc = discRef.current;
    const label = labelRef.current;
    if (!enabled || !disc || !label) return;

    document.body.dataset.pointerTool = 'on';

    let px = 0;
    let py = 0;
    let x = 0;
    let y = 0;
    let w = REST;
    let h = REST;
    let tw = REST;
    let th = REST;
    let seen = false;
    // Cleared on every move so the frame after it always writes at least once.
    // Without this the first move is a no-op (the disc jumps straight onto the
    // pointer, so there is no delta left to chase) and it would sit unmoved in
    // the corner of the screen until the pointer travelled again.
    let settled = false;

    const onMove = (event: PointerEvent) => {
      settled = false;
      px = event.clientX;
      py = event.clientY;

      const el = event.target instanceof Element ? event.target : null;
      // Over a field the real cursor comes back, so the disc gets out of the way
      // rather than sitting on top of a caret. Only the field: the rest of the
      // contact section keeps the disc like every other part of the page.
      const onField = el?.closest(FIELDS);
      const zone = onField ? null : el?.closest('[data-cursor]');

      if (!seen && !onField) {
        // Jump to the pointer the first time rather than sliding in from the
        // corner of the screen.
        x = px;
        y = py;
        seen = true;
      }

      disc.style.opacity = onField ? '0' : '1';

      if (zone) {
        const text = zone.getAttribute('data-cursor') ?? '';
        label.textContent = text;
        label.style.opacity = text ? '1' : '0';
        if (text) {
          th = OPEN_HEIGHT;
          tw = Math.max(OPEN_HEIGHT, label.getBoundingClientRect().width + OPEN_PADDING);
        } else {
          th = OPEN_CIRCLE;
          tw = OPEN_CIRCLE;
        }
      } else {
        // Everything clickable gets the middle size. A cursor that answers two
        // elements out of the whole page and ignores the rest reads as broken,
        // not as restraint.
        th = el?.closest(INTERACTIVE) ? HOVER : REST;
        tw = th;
        label.style.opacity = '0';
      }
    };

    const onLeave = () => {
      disc.style.opacity = '0';
      seen = false;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    const unsubscribe = subscribeToScrollFrame(() => {
      const dx = px - x;
      const dy = py - y;
      const dw = tw - w;
      const dh = th - h;
      // Nothing to write once it has caught up, which is most frames.
      if (
        settled &&
        Math.abs(dx) < 0.1 &&
        Math.abs(dy) < 0.1 &&
        Math.abs(dw) < 0.1 &&
        Math.abs(dh) < 0.1
      ) {
        return;
      }
      settled = true;

      x += dx * 0.2;
      y += dy * 0.2;
      w += dw * 0.18;
      h += dh * 0.18;

      disc.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      disc.style.width = `${w.toFixed(1)}px`;
      disc.style.height = `${h.toFixed(1)}px`;
      disc.style.margin = `${(-h / 2).toFixed(1)}px 0 0 ${(-w / 2).toFixed(1)}px`;
    });

    return () => {
      unsubscribe();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      delete document.body.dataset.pointerTool;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={discRef} aria-hidden className="pointer-tool">
      <span ref={labelRef} className="mono-cap" />
    </div>
  );
}
