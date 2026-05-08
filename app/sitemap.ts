import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/i18n/metadata';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  return routing.locales.flatMap((locale) => {
    const path = locale === routing.defaultLocale ? '' : `/${locale}`;
    return [
      {
        url: `${base}${path}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 1,
      },
      {
        url: `${base}${path}/privacy`,
        lastModified: now,
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
    ];
  });
}
