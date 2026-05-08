import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';

interface Props {
  ratio?: '1/1' | '4/5' | '3/4' | '16/9' | '9/16';
  src?: string;
  alt?: string;
  label?: string;
  caption?: ReactNode;
  tone?: 'warm' | 'sun' | 'studio' | 'cool';
  taped?: boolean;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}

const TONES = {
  warm: 'linear-gradient(160deg, #d4b08c 0%, #b88a64 70%, #8a5d3e 100%)',
  sun: 'linear-gradient(160deg, #e8c79b 0%, #c89a64 70%, #8a5e2e 100%)',
  studio: 'linear-gradient(160deg, #c5b89e 0%, #9b8c70 70%, #5f5544 100%)',
  cool: 'linear-gradient(160deg, #c1bfb1 0%, #8e8b7a 70%, #4f4d42 100%)',
} as const;

export function Photo({
  ratio = '4/5',
  src,
  alt = '',
  label,
  caption,
  tone = 'warm',
  taped,
  rotate = 0,
  className,
  style,
  priority,
}: Props) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {taped && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: -10,
            left: '50%',
            transform: 'translateX(-50%) rotate(-3deg)',
            width: 80,
            height: 22,
            background: 'rgba(255,243,210,.55)',
            border: '1px solid rgba(31,27,23,.08)',
            zIndex: 2,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}
      <div
        style={{
          aspectRatio: ratio,
          background: src ? undefined : TONES[tone],
          backgroundImage: src
            ? undefined
            : `${TONES[tone]}, repeating-linear-gradient(135deg, rgba(255,255,255,.04) 0 12px, transparent 12px 24px)`,
          backgroundBlendMode: 'overlay',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 30px 60px -30px rgba(0,0,0,.35), inset 0 0 0 1px rgba(0,0,0,.05)',
          width: '100%',
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
          label && (
            <div
              style={{
                position: 'absolute',
                left: 14,
                bottom: 12,
                fontFamily: 'var(--font-body), serif',
                fontStyle: 'italic',
                fontSize: 12,
                color: 'rgba(255,255,255,.85)',
                letterSpacing: '0.02em',
              }}
            >
              {label}
            </div>
          )
        )}
      </div>
      {caption && (
        <div
          style={{
            marginTop: 12,
            fontSize: 22,
            color: 'var(--ink)',
            fontFamily: 'var(--font-hand)',
            transform: 'rotate(-1deg)',
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
