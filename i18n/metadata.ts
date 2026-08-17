/**
 * Every string that leaves the site: the browser tab, the Google result, the
 * card that renders when the link is pasted into a chat, the JSON-LD graph.
 *
 * The traffic here arrives from an Instagram bio, so the search that matters is
 * someone typing her name, or "personal trainer Bussoleno". Both need to be in
 * title: a title that only says what she does competes with every trainer in
 * Italy and wins nothing.
 */

/** The person. Used as the OG site name, the title suffix and the graph node. */
export const SITE_NAME = 'Alessia Alfano';

export const SITE_TITLE_IT = 'Alessia Alfano · Personal Trainer e Chinesiologa a Bussoleno';
export const SITE_TITLE_EN = 'Alessia Alfano · Personal Trainer and Kinesiologist in Bussoleno';

export const SITE_DESCRIPTION_IT =
  'Personal training e chinesiologia a Bussoleno. Postura, recupero dopo un infortunio, percorsi costruiti sulla persona. Sedute in studio e online.';
export const SITE_DESCRIPTION_EN =
  'Personal training and kinesiology in Bussoleno, Italy. Posture, recovery, programmes built around the person. Studio sessions and online.';

/**
 * Bussoleno, in the Susa valley west of Turin.  The `AdministrativeArea` in the
 * JSON-LD graph stays "Valle di Susa": that is the area served, and Bussoleno
 * sits inside it. The street address is deliberately absent
 * from the structured data: the studio is private and by appointment, and
 * publishing a precise address we have not been given is not a detail to guess.
 * Locality and province are enough for a local pack result.
 */
export const STUDIO_LOCALITY = 'Bussoleno';
export const STUDIO_REGION = 'TO';
export const STUDIO_COUNTRY = 'IT';

export const INSTAGRAM_HANDLE = 'alessiaalfano.chinesiologa';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

/**
 * Inlined at build time, not read at runtime: everything below is used while
 * rendering metadata, so a Workers secret set after the build would never reach
 * it. Missing at build, the canonical, the sitemap and every og:image silently
 * point at localhost.
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}
