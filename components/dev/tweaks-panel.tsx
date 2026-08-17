'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const THEMES = [
  { id: 'light', label: 'Light', hint: 'off-white + viola elettrico' },
  { id: 'light-warm', label: 'Light · warm', hint: 'avorio + plum + oro antico' },
  { id: 'dark', label: 'Dark', hint: 'nero + viola Bottega · default' },
  { id: 'dark-noir', label: 'Dark · noir', hint: 'mauve desaturato + champagne' },
  { id: 'dark-neon', label: 'Dark · neon', hint: 'viola vivido + oro freddo' },
] as const;

export function TweaksPanel() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // next-themes hydration-safety: avoid SSR/CSR mismatch by waiting for mount.
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
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 12,
      }}
    >
      {open ? (
        <div
          style={{
            background: '#1a1a22',
            color: '#f4f2ee',
            border: '1px solid #2a2a35',
            padding: 14,
            borderRadius: 6,
            boxShadow: '0 8px 24px rgba(0,0,0,.4)',
            minWidth: 260,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
              borderBottom: '1px solid #2a2a35',
              paddingBottom: 8,
            }}
          >
            <strong style={{ fontSize: 13 }}>Tweaks · dev</strong>
            <button
              onClick={() => setOpen(false)}
              aria-label="Chiudi"
              style={{
                background: 'transparent',
                color: '#f4f2ee',
                border: 'none',
                cursor: 'pointer',
                fontSize: 18,
                padding: 0,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          <div style={{ marginBottom: 10, opacity: 0.75 }}>
            <div>
              theme: <code>{theme ?? '—'}</code>
            </div>
            {theme === 'system' && (
              <div>
                resolved: <code>{resolvedTheme ?? '—'}</code>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {THEMES.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  style={{
                    textAlign: 'left',
                    padding: '8px 10px',
                    background: active ? '#9c5bff' : 'transparent',
                    color: active ? '#0a0a0c' : '#f4f2ee',
                    border: `1px solid ${active ? '#9c5bff' : '#2a2a35'}`,
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 12,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{t.label}</div>
                  <div style={{ opacity: active ? 0.8 : 0.55, fontSize: 11, marginTop: 2 }}>
                    {t.hint}
                  </div>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setTheme('system')}
              style={{
                textAlign: 'left',
                padding: '8px 10px',
                background: theme === 'system' ? '#9c5bff' : 'transparent',
                color: theme === 'system' ? '#0a0a0c' : '#f4f2ee',
                border: `1px solid ${theme === 'system' ? '#9c5bff' : '#2a2a35'}`,
                borderRadius: 4,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 12,
                marginTop: 2,
              }}
            >
              <div style={{ fontWeight: 600 }}>System</div>
              <div style={{ opacity: 0.55, fontSize: 11, marginTop: 2 }}>segui preferenza OS</div>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: '#9c5bff',
            color: '#0a0a0c',
            border: 'none',
            padding: '10px 14px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontWeight: 700,
            fontSize: 12,
            borderRadius: 4,
            boxShadow: '0 4px 12px rgba(0,0,0,.3)',
          }}
        >
          Tweaks
        </button>
      )}
    </div>
  );
}
