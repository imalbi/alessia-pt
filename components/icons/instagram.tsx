/**
 * The Instagram mark, drawn here because lucide-react dropped its brand icons
 * in v1 and there is no glyph left in the set that reads as "Instagram": the
 * generic camera and at-sign both make the reader guess.
 *
 * Geometry and stroke follow the lucide conventions the rest of the site uses
 * (24 viewBox, 1.5 stroke, round joins, `currentColor`) so it sits in a row of
 * lucide icons without looking pasted in.
 */
export function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  );
}
