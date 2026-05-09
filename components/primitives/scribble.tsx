'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactElement } from 'react';

export type ScribbleKind =
  | 'underline'
  | 'underline-double'
  | 'circle'
  | 'arrow-curve'
  | 'arrow-down'
  | 'star'
  | 'scribble-block'
  | 'tick';

interface Props {
  kind: ScribbleKind;
  color?: string;
  className?: string;
  style?: CSSProperties;
  /** When true (default), the draw-in animation is delayed until the SVG enters the viewport. */
  triggerOnView?: boolean;
}

const STROKE = {
  fill: 'none',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const DRAW_STYLE: CSSProperties = {
  strokeDasharray: 600,
  strokeDashoffset: 600,
  animation: 'draw 1.4s cubic-bezier(.7,0,.3,1) .2s forwards',
};

const FROZEN_STYLE: CSSProperties = {
  strokeDasharray: 600,
  strokeDashoffset: 600,
};

export function Scribble({
  kind,
  color = 'var(--accent)',
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
      // Bypass the IO observation when reduced-motion is requested or IO is
      // unavailable (jsdom): show the scribble drawn immediately.
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

  const stroke = { ...STROKE, stroke: color };
  const drawStyle = shouldDraw ? DRAW_STYLE : FROZEN_STYLE;
  const baseStyle: CSSProperties = { width: '100%', overflow: 'visible', ...style };

  // Geometric atelier hairlines (no longer hand-drawn squiggles).
  // Underline = clean horizontal line + a short diagonal "tick" finisher
  // — reads as a deliberate atelier mark, not a handwritten scribble.
  switch (kind) {
    case 'underline':
      return (
        <svg ref={ref} viewBox="0 0 320 16" className={className} style={baseStyle}>
          <path d="M2 8 L 290 8" {...stroke} style={drawStyle} />
          <path
            d="M290 8 L 312 2"
            {...stroke}
            style={{ ...drawStyle, animationDelay: '.6s' }}
          />
        </svg>
      );
    case 'underline-double':
      return (
        <svg ref={ref} viewBox="0 0 320 16" className={className} style={baseStyle}>
          <path d="M2 6 L 316 6" {...stroke} style={drawStyle} />
          <path
            d="M2 12 L 240 12"
            {...stroke}
            style={{ ...drawStyle, animationDelay: '.4s' }}
          />
        </svg>
      );
    case 'circle':
      return (
        <svg ref={ref} viewBox="0 0 220 80" className={className} style={baseStyle}>
          <ellipse
            cx="110"
            cy="40"
            rx="100"
            ry="32"
            {...stroke}
            style={{
              ...drawStyle,
              strokeDasharray: 420,
              strokeDashoffset: 420,
            }}
          />
        </svg>
      );
    case 'arrow-curve':
      return (
        <svg ref={ref} viewBox="0 0 160 120" className={className} style={baseStyle}>
          <path d="M10 20 Q 90 20, 130 100" {...stroke} style={drawStyle} />
          <path
            d="M120 88 L 130 102 L 144 92"
            {...stroke}
            style={{ ...drawStyle, animationDelay: '.8s' }}
          />
        </svg>
      );
    case 'arrow-down':
      return (
        <svg ref={ref} viewBox="0 0 40 80" className={className} style={baseStyle}>
          <path d="M20 4 L 20 70" {...stroke} style={drawStyle} />
          <path
            d="M10 60 L 20 72 L 30 60"
            {...stroke}
            style={{ ...drawStyle, animationDelay: '.5s' }}
          />
        </svg>
      );
    case 'star':
      return (
        <svg ref={ref} viewBox="0 0 60 60" className={className} style={baseStyle}>
          <path
            d="M30 8 L 32 26 L 50 28 L 34 36 L 40 54 L 30 42 L 20 54 L 26 36 L 10 28 L 28 26 Z"
            {...stroke}
            style={drawStyle}
          />
        </svg>
      );
    case 'scribble-block':
      return (
        <svg ref={ref} viewBox="0 0 320 60" className={className} style={baseStyle}>
          <path
            d="M10 18 L 310 18 M 10 32 L 280 32 M 10 46 L 240 46"
            {...stroke}
            style={{ ...drawStyle, strokeDasharray: 900, strokeDashoffset: 900 }}
          />
        </svg>
      );
    case 'tick':
      return (
        <svg ref={ref} viewBox="0 0 40 40" className={className} style={baseStyle}>
          <path d="M6 22 L 16 32 L 34 8" {...stroke} style={drawStyle} />
        </svg>
      );
    default:
      return null;
  }
}
