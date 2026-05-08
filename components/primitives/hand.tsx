import type { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
  as?: 'span' | 'div' | 'p';
}

export function Hand({
  children,
  rotate = -1,
  className,
  style,
  as: Component = 'span',
}: Props) {
  return (
    <Component
      className={className}
      style={{
        fontFamily: 'var(--font-hand)',
        color: 'var(--hand)',
        transform: `rotate(${rotate}deg)`,
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
