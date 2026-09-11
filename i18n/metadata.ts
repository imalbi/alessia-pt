/**
 * Every string that leaves the site: the browser tab, the Google result, the
 * card that renders when the link is pasted into a chat, the JSON-LD graph.
 *
 * The traffic here arrives from an Instagram bio, so the search that matters is
 * someone typing her name, or "personal trainer Susa". Both need to be in
 * title: a title that only says what she does competes with every trainer in
 * Italy and wins nothing.
 */

/** The person. Used as the OG site name, the title suffix and the graph node. */
export const SITE_NAME = 'Alessia Alfano';

export const SITE_TITLE = 'Alessia Alfano · Personal Trainer e Chinesiologa a Susa';
export const SITE_TITLE_IT = SITE_TITLE;

export const SITE_DESCRIPTION =
  'Personal training e chinesiologia a Susa. Postura, recupero dopo un infortunio, percorsi costruiti sulla persona. Presso Élite Fitness Club e online.';
export const SITE_DESCRIPTION_IT = SITE_DESCRIPTION;

export const STUDIO_NAME = 'Élite Fitness Club';
export const STUDIO_STREET_ADDRESS = 'Regione Priorale 34';
export const STUDIO_POSTAL_CODE = '10059';
export const STUDIO_LOCALITY = 'Susa';
export const STUDIO_LOCATION = `${STUDIO_NAME} · ${STUDIO_STREET_ADDRESS}, ${STUDIO_LOCALITY}`;

/** Neighbouring town in the same valley, served alongside Susa. */
export const AREA_SERVED_ALSO = 'Bussoleno';
export const STUDIO_REGION = 'TO';
export const STUDIO_COUNTRY = 'IT';

export const INSTAGRAM_HANDLE = 'alessiaalfano.chinesiologa';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

/**
 * Build credit. A constant rather than a message key: it is a handle and a
 * preposition, identical in both locales, so two JSON entries would only be two
 * places to forget when the handle changes.
 */
export const AUTHOR_HANDLE = 'imalbi';
export const AUTHOR_URL = `https://github.com/${AUTHOR_HANDLE}`;

/**
 * Inlined at build time, not read at runtime: everything below is used while
 * rendering metadata, so a Workers secret set after the build would never reach
 * it. Missing at build, the canonical, the sitemap and every og:image silently
 * point at localhost.
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}
