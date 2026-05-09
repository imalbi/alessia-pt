'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import { Menu } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme-toggle';

const ANCHORS = ['about', 'services', 'stories', 'contact'] as const;
type Anchor = (typeof ANCHORS)[number];

export function Nav() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Anchor | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    const els = ANCHORS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;
    // Trigger when a section's top crosses ~20% from the viewport top, so the
    // active state changes as the heading clears the floating dock.
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top) setActive(top.target.id as Anchor);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const otherLocale = locale === 'it' ? 'en' : 'it';

  return (
    <nav
      className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 md:top-6"
      aria-label={t('openMenu')}
    >
      {/* Desktop dock — floating pill, centered */}
      <div
        className="hidden items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur md:flex"
        style={{
          background: 'color-mix(in oklab, var(--paper-2) 72%, transparent)',
          borderColor: 'var(--ink-15)',
          boxShadow: '0 8px 24px -12px color-mix(in oklab, var(--ink) 40%, transparent)',
        }}
      >
        <Link
          href="/"
          className="px-3 py-1.5 no-underline"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            color: 'var(--ink)',
            fontSize: 16,
            letterSpacing: '-0.01em',
          }}
        >
          Alessia
        </Link>
        <span
          aria-hidden
          style={{
            width: 1,
            height: 18,
            background: 'var(--ink-15)',
            margin: '0 4px',
          }}
        />
        <ul
          className="flex items-center"
          style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
        >
          {ANCHORS.map((a) => {
            const isActive = active === a;
            return (
              <li key={a}>
                <a
                  href={`#${a}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="relative rounded-full px-3 py-1.5 transition-colors"
                  style={{ color: isActive ? 'var(--ink)' : 'var(--ink-70)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive ? 'var(--ink)' : 'var(--ink-70)')
                  }
                >
                  {t(a)}
                  {isActive && (
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        left: '50%',
                        bottom: 2,
                        transform: 'translateX(-50%)',
                        width: 16,
                        height: 2,
                        background: 'var(--accent)',
                        borderRadius: 1,
                      }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
        <span
          aria-hidden
          style={{
            width: 1,
            height: 18,
            background: 'var(--ink-15)',
            margin: '0 4px',
          }}
        />
        <Link
          href={pathname}
          locale={otherLocale}
          className="px-3 py-1.5 text-xs tracking-wider uppercase transition-colors"
          style={{ color: 'var(--ink-70)', fontFamily: 'var(--font-body)' }}
        >
          {otherLocale}
        </Link>
        <ThemeToggle />
      </div>

      {/* Mobile dock — compact pill with brand + hamburger */}
      <div
        className="flex w-full max-w-md items-center justify-between gap-2 rounded-full border px-4 py-2 backdrop-blur md:hidden"
        style={{
          background: 'color-mix(in oklab, var(--paper-2) 72%, transparent)',
          borderColor: 'var(--ink-15)',
          boxShadow: '0 8px 24px -12px color-mix(in oklab, var(--ink) 40%, transparent)',
        }}
      >
        <Link
          href="/"
          className="no-underline"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            color: 'var(--ink)',
            fontSize: 16,
            letterSpacing: '-0.01em',
          }}
        >
          Alessia
        </Link>
        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Trigger
            aria-label={t('openMenu')}
            className="inline-flex h-9 w-9 items-center justify-center"
            style={{ color: 'var(--ink)' }}
          >
            <Menu size={22} strokeWidth={1.75} aria-hidden />
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-50 bg-black/50" />
            <Drawer.Content
              className="fixed right-0 bottom-0 left-0 z-50 mt-24 flex h-[60vh] flex-col rounded-t-2xl"
              style={{ background: 'var(--paper)' }}
            >
              <Drawer.Title className="sr-only">{t('openMenu')}</Drawer.Title>
              <div
                className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-[color:var(--ink-30)]"
                aria-hidden
              />
              <div className="flex flex-col gap-6 p-6">
                {ANCHORS.map((a) => (
                  <a
                    key={a}
                    href={`#${a}`}
                    onClick={() => setOpen(false)}
                    className="text-2xl text-[color:var(--ink)]"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                  >
                    {t(a)}
                  </a>
                ))}
                <Link
                  href={pathname}
                  locale={otherLocale}
                  onClick={() => setOpen(false)}
                  className="text-base tracking-wider text-[color:var(--ink-70)] uppercase"
                >
                  {otherLocale === 'en' ? 'English' : 'Italiano'}
                </Link>
                <ThemeToggle withLabel className="self-start" />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </nav>
  );
}
