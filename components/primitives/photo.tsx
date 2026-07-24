import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';

interface Props {
  ratio?: '1/1' | '4/5' | '3/4' | '16/9' | '9/16';
  src?: string;
  alt?: string;
  /** Visible label inside the empty placeholder, e.g. "Alessia · ritratto". */
  label?: string;
  caption?: ReactNode;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}

/**
 * Photo slot. With a `src`, renders next/image at the requested ratio.
 *
 * Without one, renders an art-director's brief: ratio in caps top-left,
 * a thin gold composition crosshair, the field label centered, and a
 * "fotografia in arrivo" footer. Reads as a working spec, not a fake
 * portrait — the placeholder is honest about being one.
 */
export function Photo({
  ratio = '4/5',
  src,
  alt = '',
  label,
  caption,
  className,
  style,
  priority,
}: Props) {
  return (
    <div className={className} style={{ position: 'relative', display: 'block', width: '100%', ...style }}>
      <div
        style={{
          aspectRatio: ratio,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          background: src ? undefined : 'var(--paper-2)',
          border: src ? undefined : '1px solid var(--ink-15)',
          boxShadow: src
            ? '0 30px 60px -30px color-mix(in oklab, var(--accent) 30%, transparent)'
            : 'none',
        }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            priority={priority}
          />
        ) : (
          <PlaceholderBrief ratio={ratio} label={label} />
        )}
      </div>
      {caption && (
        <div
          style={{
            marginTop: 12,
            fontSize: 14,
            color: 'var(--ink-70)',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            letterSpacing: '0.04em',
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}

function PlaceholderBrief({ ratio, label }: { ratio: string; label?: string }) {
  return (
    <>
      {/* Screen-reader fallback: the visual brief is decorative, but if this
          ever ships in production an AT user must know an image is missing. */}
      <span
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {label ? `Immagine in arrivo: ${label}` : 'Immagine in arrivo'}
      </span>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          padding: '14px 16px',
        }}
      >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          fontFamily: 'var(--font-display)',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--ink-55)',
          fontWeight: 500,
        }}
      >
        <span>{ratio.replace('/', ':')}</span>
        <span style={{ color: 'var(--ink-30)' }}>//</span>
      </div>

      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Crosshair />
        <span
          style={{
            position: 'relative',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            color: 'var(--ink-55)',
            fontSize: 'clamp(0.75rem, 1vw + 0.5rem, 1rem)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textAlign: 'center',
            background: 'var(--paper-2)',
            padding: '4px 10px',
          }}
        >
          {label ?? 'foto'}
        </span>
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--ink-55)',
          fontWeight: 500,
        }}
      >
        fotografia in arrivo
      </div>
      </div>
    </>
  );
}

function Crosshair() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, opacity: 0.55 }}
      aria-hidden
    >
      <line x1="50" y1="20" x2="50" y2="80" stroke="var(--ink-30)" strokeWidth="0.4" />
      <line x1="20" y1="50" x2="80" y2="50" stroke="var(--ink-30)" strokeWidth="0.4" />
    </svg>
  );
}
