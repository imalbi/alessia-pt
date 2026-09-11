import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/instagram';
import {
  SITE_NAME,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  AUTHOR_HANDLE,
  AUTHOR_URL,
} from '@/i18n/metadata';

export function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();
  const vat = process.env.NEXT_PUBLIC_VAT_NUMBER;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <footer
      className="overflow-hidden px-[5vw] pt-[clamp(40px,6vh,70px)]"
      style={{ borderTop: '1px solid var(--ink-15)', background: 'var(--paper)' }}
    >
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-end justify-between gap-6">
        <p
          className="max-w-[30ch] text-[14.5px] leading-relaxed"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
        >
          {t('tagline')}
          <br />
          {t('studioLine')}
        </p>
        {/* Every entry is an inline-flex row, icon or not: with one link laying
            its text out as a flex item and the others as a plain line box, the
            two sat on different vertical centres and the row read as crooked. */}
        <ul
          className="flex flex-wrap items-center gap-5 text-sm [&>li]:flex [&>li]:items-center"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
        >
          {/* A constant rather than an env var: the profile is also declared as
              `sameAs` in the JSON-LD, and a build without the variable set would
              have the page claim an account it never links to. */}
          <li>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t('instagram')} @${INSTAGRAM_HANDLE}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--ink)]"
            >
              {/* The glyph is the recognisable part, but it stays next to the
                  word rather than replacing it: an unlabelled icon in a row of
                  text links is a guess, and this is the one link on the page
                  someone might actually be looking for. */}
              <InstagramIcon size={16} />
              {t('instagram')}
            </a>
          </li>
          {email && (
            <li>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center transition-colors hover:text-[color:var(--ink)]"
              >
                {email}
              </a>
            </li>
          )}
          <li>
            <Link
              href="/privacy"
              className="inline-flex items-center transition-colors hover:text-[color:var(--ink)]"
            >
              {t('privacy')}
            </Link>
          </li>
        </ul>
      </div>

      <div
        className="mx-auto mt-5 flex max-w-[1500px] flex-wrap justify-between gap-2 pb-4 text-xs"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-55)' }}
      >
        {/* Full name, not the wordmark. This is the one line on the site that
            has to name a person rather than a brand, and it is also where a
            search for her surname finds something to match. */}
        <span>
          © {year} {SITE_NAME} · {t('rights')}
        </span>
        {vat && (
          <span>
            {t('vatLabel')}: {vat}
          </span>
        )}
        {/* Build credit. Last in the row so it reads as a signature rather than
            a third piece of the client's own legal line, and quieter than its
            neighbours: it is the one thing here that is not about her. */}
        <a
          href={AUTHOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-[color:var(--ink)]"
        >
          by {AUTHOR_HANDLE}
          {/* Was a literal ↗ (U+2197): Unicode classes it as an emoji character,
              and iOS can serve it as a colour glyph next to 12px grey text. */}
          <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden />
        </a>
      </div>

      {/* Wordmark as a bled watermark rather than a logo lockup, cropped by the
          footer's own overflow so it registers as a texture closing the page.
          Decorative and already announced by the nav brand, so it is hidden
          from assistive tech.

          Outlined rather than filled, matching the contact watermark. A solid
          fill at 8% ink computes as 1.11:1 body text and axe fails the page on
          it on every route, the privacy pages included; a transparent fill with
          a hairline stroke is read as the decoration it is. The two watermarks
          are now the same object, which they should have been anyway. */}
      <div
        aria-hidden
        className="mx-auto max-w-[1500px] translate-y-[14%] text-[clamp(4rem,20vw,17rem)] leading-[0.76] font-extrabold uppercase"
        style={{
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.06em',
          // Stroke first, then fill, so the fill hides Bricolage's unmerged
          // internal contours. Without it every join in A, L and E draws as a
          // construction line across the letter. Fill matches this section's
          // own surface. Same treatment as the hero's outlined line.
          color: 'var(--paper)',
          paintOrder: 'stroke fill',
          WebkitTextStroke: '1px var(--ink-08)',
        }}
      >
        Alessia
      </div>
    </footer>
  );
}
