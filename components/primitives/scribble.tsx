import type { CSSProperties } from 'react';

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
}

const STROKE = {
  fill: 'none',
  strokeWidth: 3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const DRAW_STYLE: CSSProperties = {
  strokeDasharray: 600,
  strokeDashoffset: 600,
  animation: 'draw 1.4s cubic-bezier(.7,0,.3,1) .2s forwards',
};

export function Scribble({ kind, color = 'var(--hand)', className, style }: Props) {
  const stroke = { ...STROKE, stroke: color };
  const baseStyle: CSSProperties = { width: '100%', overflow: 'visible', ...style };

  switch (kind) {
    case 'underline':
      return (
        <svg viewBox="0 0 320 24" className={className} style={baseStyle}>
          <path d="M4 14 C 60 4, 130 22, 200 10 S 300 18, 316 8" {...stroke} style={DRAW_STYLE} />
        </svg>
      );
    case 'underline-double':
      return (
        <svg viewBox="0 0 320 32" className={className} style={baseStyle}>
          <path d="M4 12 C 60 4, 140 18, 316 10" {...stroke} style={DRAW_STYLE} />
          <path
            d="M8 24 C 80 18, 160 28, 312 22"
            {...stroke}
            strokeWidth={2}
            style={{ ...DRAW_STYLE, animationDelay: '.4s' }}
          />
        </svg>
      );
    case 'circle':
      return (
        <svg viewBox="0 0 220 80" className={className} style={baseStyle}>
          <path
            d="M30 40 C 30 12, 100 6, 180 14 C 220 22, 210 70, 130 72 C 60 76, 14 60, 18 36"
            {...stroke}
            style={DRAW_STYLE}
          />
        </svg>
      );
    case 'arrow-curve':
      return (
        <svg viewBox="0 0 160 120" className={className} style={baseStyle}>
          <path d="M10 20 C 60 10, 130 40, 130 100" {...stroke} style={DRAW_STYLE} />
          <path
            d="M120 88 L 130 102 L 144 92"
            {...stroke}
            style={{ ...DRAW_STYLE, animationDelay: '.8s' }}
          />
        </svg>
      );
    case 'arrow-down':
      return (
        <svg viewBox="0 0 40 80" className={className} style={baseStyle}>
          <path d="M20 4 C 14 24, 26 44, 20 70" {...stroke} style={DRAW_STYLE} />
          <path
            d="M10 60 L 20 72 L 30 58"
            {...stroke}
            style={{ ...DRAW_STYLE, animationDelay: '.5s' }}
          />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 60 60" className={className} style={baseStyle}>
          <path
            d="M30 8 L 32 26 L 50 28 L 34 36 L 40 54 L 30 42 L 20 54 L 26 36 L 10 28 L 28 26 Z"
            {...stroke}
            style={DRAW_STYLE}
          />
        </svg>
      );
    case 'scribble-block':
      return (
        <svg viewBox="0 0 320 60" className={className} style={baseStyle}>
          <path
            d="M10 20 C 80 8, 160 32, 310 14 M 10 32 C 90 22, 200 42, 312 28 M 12 46 C 100 38, 220 52, 308 42"
            {...stroke}
            strokeWidth={2.4}
            style={{ ...DRAW_STYLE, strokeDasharray: 1200, strokeDashoffset: 1200 }}
          />
        </svg>
      );
    case 'tick':
      return (
        <svg viewBox="0 0 40 40" className={className} style={baseStyle}>
          <path d="M6 22 L 16 32 L 34 8" {...stroke} style={DRAW_STYLE} />
        </svg>
      );
    default:
      return null;
  }
}
