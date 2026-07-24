'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import { Menu } from 'lucide-react';
import { LayoutGroup, motion, useReducedMotion } from 'motion/react';
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
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const els = ANCHORS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;

    // Scroll-spy: pick the deepest section whose top has crossed the pivot
    // line at ~30% of the viewport. Falls back to the last anchor when the
    // page is scrolled to its bottom — IntersectionObserver alone can't reach
    // sections that never make it past the active band before scroll runs out.
    const update = () => {
      const pivot = window.innerHeight * 0.3;
      let current: Anchor | null = null;
      for (const id of ANCHORS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= pivot) current = id;
      }
      const docHeight = document.documentElement.scrollHeight;
      const scrolled = window.innerHeight + window.scrollY;
      if (scrolled >= docHeight - 24) current = ANCHORS[ANCHORS.length - 1] ?? current;
      setActive(current);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const otherLocale = locale === 'it' ? 'en' : 'it';

  return (
    <nav
      className="fixed inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-40 flex justify-center px-4 md:top-[max(1.5rem,env(safe-area-inset-top))]"
      aria-label={t('mainNav')}
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
        <LayoutGroup>
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
                    data-active={isActive ? 'true' : undefined}
                    className="nav-anchor relative rounded-full px-3 py-1.5 transition-colors"
                  >
                    {t(a)}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        aria-hidden
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 380, damping: 32 }
                        }
                        style={{
                          position: 'absolute',
                          left: '50%',
                          bottom: 2,
                          x: '-50%',
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
        </LayoutGroup>
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
            <Drawer.Overlay
              className="fixed inset-0 z-50"
              style={{
                /* Studio-near-black scrim, theme-fixed so it always darkens
                   the page (never #000 — DESIGN.md). */
                background: 'rgba(10, 10, 12, 0.6)',
              }}
            />
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
