import { getSiteUrl } from '@/i18n/metadata';

interface Props {
  locale: string;
}

export function JsonLd({ locale }: Props) {
  const url = getSiteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${url}#alessia`,
        name: 'Alessia',
        jobTitle:
          locale === 'en' ? 'Personal Trainer & Kinesiologist' : 'Personal Trainer & Chinesiologa',
        url,
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${url}#business`,
        name: 'Alessia · Personal Trainer & Chinesiologa',
        founder: { '@id': `${url}#alessia` },
        url,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // Stable JSON output, no user input — XSS-safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
