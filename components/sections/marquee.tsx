import { useLocale, useTranslations } from 'next-intl';
import { PushedTrack } from '@/components/primitives/pushed-track';

const KEYS = ['posture', 'recovery', 'strength', 'movement', 'toning'] as const;

/**
 * Keyword band between the hero and About.
 *
 * A continuous loop, which the old DESIGN.md forbade outright. The ban was
 * written against ambient decoration that never resolves; here the movement is
 * the point of the band, it is the seam between the opening plate and the
 * reading sections, and it holds the dark surface one beat longer so the
 * transition is not a hard cut. Recorded as an exception in DESIGN.md.
 *
 * Two obligations come with keeping it: it stops dead under reduced motion
 * (globals.css sets `animation: none`, not a collapsed duration, which would
 * restart the loop hundreds of times a second), and it pauses on hover so the
 * words can actually be read.
 *
 * The section stays a server component. `<PushedTrack>` is the only client
 * island: once it is running it takes the loop off the CSS keyframes and adds
 * the scroll push, and until then the band moves on the keyframes alone.
 *
 * The words repeat what the headings already say, so the duplicate track is
 * hidden from assistive tech and only the first pass is announced.
 */
export function Marquee() {
  const t = useTranslations('Marquee');
  const locale = useLocale();
  /* Sorted on the translated word, not on the key: alphabetical order differs
     per language (Chinesiologia opens the Italian band, Functional strength the
     English one) and `localeCompare` also gets the accent on Mobilità right.
     Sorting here rather than reordering KEYS means the band stays in order when
     the wording changes. */
  const words = KEYS.map((k) => t(k)).sort((a, b) => a.localeCompare(b, locale));

  const track = (
    <span
      className="flex text-[clamp(1.4rem,3.4vw,2.9rem)] font-semibold whitespace-nowrap uppercase"
      style={{
        fontFamily: 'var(--font-display)',
        letterSpacing: '-0.02em',
        /* 4.5:1 on --paper-2, which is the bar here whatever the comment used
           to claim. The exemption for large text needs 24px at this weight, or
           18.66px at 700, and `font-semibold` is 600: the clamp floor lands on
           22.4px on a phone, so the band was short on both counts and axe
           failed the page at 3.55:1. 50% alpha computes 4.86:1, far enough
           above the line to survive rounding, and still recessive enough that
           the words stay a texture rather than a heading. The mock's 20% was
           near 1.7:1 and simply unreadable. */
        color: 'color-mix(in oklab, var(--ink) 50%, transparent)',
      }}
    >
      {words.map((word) => (
        <span key={word} className="contents">
          <span className="px-7">{word}</span>
          <span className="px-7" style={{ color: 'var(--gold)' }} aria-hidden>
            ·
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      data-surface="dark"
      className="overflow-hidden py-4"
      style={{
        background: 'var(--paper-2)',
        borderTop: '1px solid var(--ink-15)',
        borderBottom: '1px solid var(--ink-15)',
      }}
    >
      <PushedTrack className="marquee-track">
        {track}
        <span aria-hidden className="contents">
          {track}
        </span>
      </PushedTrack>
    </div>
  );
}
