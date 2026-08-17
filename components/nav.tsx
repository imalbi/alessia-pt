'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme-toggle';

// 'stories' is out while the CaseStories section is commented out in page.tsx:
// a menu entry pointing at an anchor that is no longer rendered scrolls nowhere.
const ANCHORS = ['about', 'process', 'services', 'contact'] as const;
type Anchor = (typeof ANCHORS)[number];

/**
 * Floating dock with an expanding panel.
 *
 * The panel opens inside the pill rather than as a bottom sheet, which is what
 * the redesign asks for and what lets one control serve every viewport: the
 * dock is the same object open or closed, so there is no separate mobile
 * navigation to keep in sync. The previous Vaul drawer only existed below `md`.
 *
 * The language switch and the theme toggle are kept. The source mock dropped
 * both, but it was a dark-only Italian static page; this site is bilingual and
 * ships four themes, and losing either would be a regression rather than a
 * design decision.
 */
export function Nav() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Anchor | null>(null);
  const panelId = useId();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scroll-spy: deepest section whose top has crossed a pivot at 30% of the
    // viewport, with a floor at the last anchor so the final section still wins
    // when the page runs out of scroll before it reaches the band.
    const update = () => {
      const pivot = window.innerHeight * 0.3;
      let current: Anchor | null = null;
      for (const id of ANCHORS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= pivot) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24) {
        current = ANCHORS[ANCHORS.length - 1] ?? current;
      }
      setActive(current);

      // The scrollbar gutter is canvas, not content: it takes the root
      // background-color and ignores everything else, so the hero's dark
      // surface cannot reach it on its own. Hand the canvas back to paper only
      // once the hero has given up most of the viewport. Colours live in
      // globals.css; this only says where the boundary is.
      const hero = document.getElementById('top');
      if (hero) {
        document.documentElement.toggleAttribute(
          'data-past-hero',
          hero.getBoundingClientRect().bottom < window.innerHeight / 2,
        );
      }
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

  // Escape closes, and a click outside dismisses. An expanded panel covers the
  // top of the page, so leaving it open with no way out but the toggle is the
  // kind of trap that a bottom sheet handles for you and this does not.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  const otherLocale = locale === 'it' ? 'en' : 'it';

  return (
    <nav
      ref={navRef}
      aria-label={t('mainNav')}
      // Content-width on desktop, so the dock is only as wide as the links it
      // holds. Fixed width below `lg`, where the logo and the toggle need to sit
      // at opposite ends rather than huddle in the middle.
      //
      // The inline bar starts at `lg`, not `md`. Five links plus the language,
      // theme and CTA come to roughly 760px, which at the 768px `md` breakpoint
      // would sit edge to edge with no margin at all.
      className="fixed top-[max(20px,env(safe-area-inset-top))] left-1/2 z-50 w-[min(94vw,560px)] -translate-x-1/2 lg:w-max lg:max-w-[96vw]"
    >
      {/* Plain alpha over the page, deliberately not `backdrop-filter`. The pill
          still has to be see-through — it reads grey over the hero plate and
          paper over everything below it — but a backdrop-filter snapshots the
          backdrop into a layer of its own, and that snapshot is what flickered:
          a hard vertical seam across the bar, on a backdrop measured to be
          identical on both sides of it. Ordinary transparency composites in the
          same pass, so it has nothing to get out of step with.

          Nothing is given up. The backdrop under the dock is near-flat at every
          scroll position on this page, so blurring it returned the colour it
          already was. */}
      <div
        className="overflow-hidden rounded-[26px]"
        style={{
          background: 'color-mix(in oklab, var(--paper-2) 86%, transparent)',
          border: '1px solid var(--ink-15)',
          boxShadow: '0 20px 60px -30px color-mix(in oklab, var(--ink) 45%, transparent)',
        }}
      >
        <div className="flex items-center justify-between gap-4 py-2.5 pr-3 pl-5">
          <Link
            href="/"
            className="text-[17px] no-underline"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}
          >
            Alessia<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {ANCHORS.map((a) => (
              <li key={a}>
                <a
                  href={`#${a}`}
                  aria-current={active === a ? 'true' : undefined}
                  data-active={active === a ? 'true' : undefined}
                  className="nav-anchor block rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-colors"
                >
                  {t(a)}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Language and theme move inline on desktop. They used to live only
                in the panel, which was the whole reason the panel had to exist
                at a width where every link was already on screen. */}
            <span
              aria-hidden
              className="mx-1 hidden h-4 w-px lg:block"
              style={{ background: 'var(--ink-15)' }}
            />
            <Link
              href={pathname}
              locale={otherLocale}
              aria-label={t('language')}
              className="mono-cap hidden min-h-9 items-center rounded-full px-2.5 transition-colors hover:text-[color:var(--ink)] lg:inline-flex"
              style={{ color: 'var(--ink-70)' }}
            >
              {otherLocale}
            </Link>
            <span className="hidden lg:block">
              <ThemeToggle />
            </span>
            <a
              href="#contact"
              data-cursor={t('contactCta')}
              className="hidden rounded-full px-4 py-2 text-[13px] font-semibold transition-colors hover:bg-[color:var(--accent-15)] lg:inline-flex"
              style={{ border: '1px solid var(--accent)', color: 'var(--ink)' }}
            >
              {t('contactCta')}
            </a>
            {/* Below `lg` only. Once the bar is wide enough to show every
                destination, a toggle that reveals the same five links is just a
                second control doing the first one's job. */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="mono-cap flex min-h-9 cursor-pointer items-center gap-2.5 rounded-full px-3.5 py-2 lg:hidden"
              style={{
                border: '1px solid var(--ink-15)',
                background: 'var(--ink-08)',
                color: 'var(--ink)',
                letterSpacing: '0.16em',
              }}
            >
              <span>{open ? t('menuClose') : t('menu')}</span>
              <span aria-hidden className="grid gap-[3px]">
                <span
                  className="block h-[1.5px] w-3.5 transition-transform duration-[450ms] ease-[var(--ease-exp)]"
                  style={{
                    background: 'var(--ink)',
                    transform: open ? 'translateY(2.25px) rotate(45deg)' : 'none',
                  }}
                />
                <span
                  className="block h-[1.5px] w-3.5 transition-transform duration-[450ms] ease-[var(--ease-exp)]"
                  style={{
                    background: 'var(--ink)',
                    transform: open ? 'translateY(-2.25px) rotate(-45deg)' : 'none',
                  }}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id={panelId}
          data-navpanel
          data-open={open}
          className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[var(--ease-exp)] lg:hidden"
          style={{ maxHeight: open ? 520 : 0, opacity: open ? 1 : 0 }}
          // A collapsed panel is still in the DOM at zero height. Without this
          // the whole nav list stays tabbable behind a closed dock.
          inert={!open}
        >
          <div
            aria-hidden
            className="h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, var(--ink-15) 12%, var(--ink-15) 88%, transparent)',
            }}
          />
          <ul className="grid gap-0.5 px-5 pt-4 pb-5">
            {ANCHORS.map((a) => (
              <li key={a}>
                <a
                  href={`#${a}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === a ? 'true' : undefined}
                  className="block py-2.5 text-[clamp(1.7rem,4.6vw,2.4rem)] leading-tight font-bold transition-colors"
                  style={{
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.03em',
                    color: active === a ? 'var(--accent)' : 'var(--ink)',
                  }}
                >
                  {t(a)}
                </a>
              </li>
            ))}
            <li
              className="mt-3.5 flex flex-wrap items-center justify-between gap-3 pt-4"
              style={{ borderTop: '1px solid var(--ink-15)' }}
            >
              <span className="flex items-center gap-1">
                <Link
                  href={pathname}
                  locale={otherLocale}
                  onClick={() => setOpen(false)}
                  className="mono-cap inline-flex min-h-11 items-center rounded-full px-3 transition-colors hover:text-[color:var(--ink)]"
                  style={{ color: 'var(--ink-70)' }}
                >
                  {otherLocale === 'en' ? 'English' : 'Italiano'}
                </Link>
                <ThemeToggle />
              </span>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 items-center rounded-full px-5 text-[13px] font-bold"
                style={{ background: 'var(--accent)', color: 'var(--paper)' }}
              >
                {t('bookCta')}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
