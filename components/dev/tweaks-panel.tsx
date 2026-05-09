'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const THEMES = ['light', 'dark'] as const;

export function TweaksPanel() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // next-themes hydration-safety: avoid SSR/CSR mismatch by waiting for mount.
  // The single setState here is intentional (canonical next-themes pattern).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 200,
        fontFamily: 'system-ui, sans-serif',
        fontSize: 12,
      }}
    >
      {open ? (
        <div
          style={{
            background: '#fff',
            border: '1px solid #ccc',
            padding: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,.1)',
            minWidth: 180,
            color: '#000',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <strong>Tweaks (dev)</strong>
            <button onClick={() => setOpen(false)} aria-label="Close">
              ×
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {THEMES.map((t) => (
              <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="radio"
                  name="theme"
                  checked={theme === t}
                  onChange={() => setTheme(t)}
                />
                {t}
              </label>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: '#9c5bff',
            color: '#0a0a0c',
            border: 'none',
            padding: '8px 12px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontWeight: 600,
          }}
        >
          Tweaks
        </button>
      )}
    </div>
  );
}
