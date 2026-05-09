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
 * Without one, renders an honest empty placeholder: a tinted paper rectangle
 * with the field name set in display type. Deliberately not a fake-portrait
 * gradient with washi-tape effect — that performance on emptiness was the
 * costume the brand cannot wear without real photography.
 */
export function Photo({ ratio = '4/5', src, alt = '', label, caption, className, style, priority }: Props) {
  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <div
        style={{
          aspectRatio: ratio,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          background: src ? undefined : 'var(--paper-2)',
          border: src ? undefined : '1px solid var(--ink-15)',
          boxShadow: src
            ? '0 30px 60px -30px color-mix(in oklab, var(--ink) 35%, transparent)'
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
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                color: 'var(--ink-55)',
                fontSize: 'clamp(0.75rem, 1vw + 0.5rem, 1rem)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {label ?? 'foto'}
            </span>
          </div>
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
