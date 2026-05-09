'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import { Menu } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme-toggle';

const ANCHORS = ['about', 'services', 'stories', 'contact'] as const;

export function Nav() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const otherLocale = locale === 'it' ? 'en' : 'it';

  return (
    <nav
      className="fixed inset-x-0 top-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'color-mix(in oklab, var(--paper) 90%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : undefined,
        borderBottom: scrolled ? '1px solid var(--ink-15)' : '1px solid transparent',
        padding: scrolled ? '12px 16px' : '20px 16px',
      }}
    >
      <div className="mx-auto flex max-w-screen-xl items-baseline justify-between md:px-4 lg:px-8">
        <Link href="/" className="no-underline">
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              color: 'var(--ink)',
              fontSize: 22,
            }}
          >
            Alessia
          </span>{' '}
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              color: 'var(--ink-70)',
              fontSize: 14,
            }}
          >
            · Personal Trainer & Chinesiologa
          </span>
        </Link>

        {/* Desktop links */}
        <ul
          className="hidden items-center gap-8 md:flex"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {ANCHORS.map((a) => (
            <li key={a}>
              <a
                href={`#${a}`}
                className="text-[color:var(--ink-70)] transition-colors hover:text-[color:var(--ink)]"
              >
                {t(a)}
              </a>
            </li>
          ))}
          <li>
            <Link
              href={pathname}
              locale={otherLocale}
              className="text-sm tracking-wider text-[color:var(--ink-70)] uppercase transition-colors hover:text-[color:var(--ink)]"
            >
              {otherLocale}
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile drawer */}
        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Trigger
            aria-label={t('openMenu')}
            className="inline-flex h-11 w-11 items-center justify-center md:hidden"
          >
            <Menu size={24} aria-hidden />
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
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
