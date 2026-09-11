'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
  /** Show inline label next to the icon (used in mobile drawer). */
  withLabel?: boolean;
  className?: string;
}

export function ThemeToggle({ withLabel = false, className }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes hydration-safety: avoid SSR/CSR mismatch by waiting for mount.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const t = useTranslations('Nav');

  if (!mounted) {
    // Reserve space to avoid layout shift; render an inert placeholder.
    return (
      <span
        aria-hidden
        className={className}
        style={{ display: 'inline-block', width: 44, height: 44 }}
      />
    );
  }

  const isDark = resolvedTheme === 'dark';
  const next = isDark ? 'light' : 'dark';
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={t(isDark ? 'switchToLight' : 'switchToDark')}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        // The icon is 20px inside a 44px tap target: without this it sits
        // 4px left of the button's centre, off-axis from the pill's other items.
        justifyContent: 'center',
        gap: 8,
        minHeight: 44,
        minWidth: 44,
        padding: withLabel ? '8px 12px' : 8,
        color: 'var(--ink-70)',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        transition: 'color 200ms',
        fontFamily: 'var(--font-body)',
        fontSize: 14,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-70)')}
    >
      <Icon size={20} strokeWidth={1.5} aria-hidden />
      {withLabel && <span>{t(isDark ? 'switchToLight' : 'switchToDark')}</span>}
    </button>
  );
}
