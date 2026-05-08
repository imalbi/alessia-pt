export const SITE_NAME = 'Alessia · Personal Trainer & Chinesiologa';
export const SITE_DESCRIPTION_IT =
  'Personal training e chinesiologia. Postura, recupero, percorsi su misura. Studio in città, sedute online.';
export const SITE_DESCRIPTION_EN =
  'Personal training and kinesiology. Posture, recovery, tailored programmes. Studio sessions and online.';

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}
