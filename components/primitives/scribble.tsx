'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactElement } from 'react';

export type ScribbleKind = 'underline' | 'underline-double';

interface Props {
  kind: ScribbleKind;
  /** Default: var(--accent) (viola). Override only when the surface needs gold accent. */
  color?: string;
  /** Default: 4. Brush stroke weight; 3 reads as restrained, 5 as committed. */
  weight?: number;
  className?: string;
  style?: CSSProperties;
  /** When true (default), the draw-in animation is delayed until the SVG enters the viewport. */
  triggerOnView?: boolean;
}

const DRAW_STYLE: CSSProperties = {
  strokeDasharray: 380,
  strokeDashoffset: 380,
  animation: 'draw 1.1s cubic-bezier(.2,.7,.3,1) .15s forwards',
};

const FROZEN_STYLE: CSSProperties = {
  strokeDasharray: 380,
  strokeDashoffset: 380,
};

/**
 * Brush-mark underline. A single low-amplitude bezier with a thick round-cap
 * stroke — reads as a deliberate marker pen pass under a headline, not a
 * hand-drawn squiggle and not a flat geometric line. Shaped to sit under
 * Bricolage 800 display headlines.
 */
export function Scribble({
  kind,
  color = 'var(--accent)',
  weight = 4,
  className,
  style,
  triggerOnView = true,
}: Props): ReactElement | null {
  const ref = useRef<SVGSVGElement>(null);
  const [shouldDraw, setShouldDraw] = useState(!triggerOnView);

  useEffect(() => {
    if (!triggerOnView) return;
    if (typeof window === 'undefined') return;

    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldDraw(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldDraw(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggerOnView]);

  const drawStyle = shouldDraw ? DRAW_STYLE : FROZEN_STYLE;
  const baseStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
    overflow: 'visible',
    display: 'block',
    ...style,
  };

  const stroke = {
    fill: 'none' as const,
    stroke: color,
    strokeWidth: weight,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (kind === 'underline') {
    return (
      <svg
        ref={ref}
        viewBox="0 0 320 18"
        preserveAspectRatio="none"
        className={className}
        style={baseStyle}
        aria-hidden
      >
        {/* Single low-amplitude bezier — slight downward sweep then settles. */}
        <path d="M 6 8 Q 110 4, 200 9 T 314 7" {...stroke} style={drawStyle} />
      </svg>
    );
  }

  // underline-double: a primary stroke + a shorter, lighter echo offset below
  return (
    <svg
      ref={ref}
      viewBox="0 0 320 22"
      preserveAspectRatio="none"
      className={className}
      style={baseStyle}
      aria-hidden
    >
      <path d="M 6 7 Q 100 3, 200 8 T 314 6" {...stroke} style={drawStyle} />
      <path
        d="M 12 16 Q 80 13, 150 16 T 240 15"
        {...stroke}
        strokeWidth={Math.max(weight - 1.5, 1.5)}
        style={{
          ...drawStyle,
          strokeDasharray: 260,
          strokeDashoffset: 260,
          animationDelay: '.45s',
        }}
      />
    </svg>
  );
}
