import {
  SITE_NAME,
  SITE_DESCRIPTION_IT,
  SITE_DESCRIPTION_EN,
  STUDIO_LOCALITY,
  AREA_SERVED_ALSO,
  STUDIO_REGION,
  STUDIO_COUNTRY,
  INSTAGRAM_URL,
  getSiteUrl,
} from '@/i18n/metadata';

interface Props {
  locale: string;
}

/**
 * The graph a search engine reads instead of guessing.
 *
 * Two nodes, one person and one practice, linked to each other. What is not
 * here is as deliberate as what is: no `telephone`, no `streetAddress`, no
 * `priceRange`, no `openingHours`. Google rewards those fields, which is
 * exactly why inventing them is tempting and wrong. They go in the day the
 * client gives them.
 */
export function JsonLd({ locale }: Props) {
  const url = getSiteUrl();
  const english = locale === 'en';
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${url}#alessia`,
        name: SITE_NAME,
        givenName: 'Alessia',
        familyName: 'Alfano',
        jobTitle: english ? 'Personal Trainer & Kinesiologist' : 'Personal Trainer e Chinesiologa',
        url,
        image: `${url}/og.jpg`,
        sameAs: [INSTAGRAM_URL],
        /* Tracks the keyword band under the hero, plus the qualification itself:
           Chinesiologia left the band but stays here, because in a local result
           it is the word that separates her from any personal trainer. The band
           runs "Tonificazione e dimagrimento" as one phrase; `knowsAbout` is a
           list of topics, so the conjunction is split into two entries. */
        knowsAbout: english
          ? [
              'Kinesiology',
              'Back pain',
              'Posture',
              'Movement education',
              'Muscle strengthening',
              'Toning',
              'Weight loss',
              'Injury recovery',
              'Prenatal exercise',
              'Postnatal recovery',
            ]
          : [
              'Chinesiologia',
              'Mal di schiena',
              'Postura',
              'Educazione al movimento',
              'Potenziamento muscolare',
              'Tonificazione',
              'Dimagrimento',
              'Recupero post-infortunio',
              'Attività motoria in gravidanza',
              'Recupero post-parto',
            ],
      },
      {
        // A place people physically train in, which is what distinguishes this
        // from a generic LocalBusiness in a local result.
        '@type': ['LocalBusiness', 'SportsActivityLocation'],
        '@id': `${url}#business`,
        name: SITE_NAME,
        description: english ? SITE_DESCRIPTION_EN : SITE_DESCRIPTION_IT,
        url,
        image: `${url}/og.jpg`,
        founder: { '@id': `${url}#alessia` },
        employee: { '@id': `${url}#alessia` },
        sameAs: [INSTAGRAM_URL],
        address: {
          '@type': 'PostalAddress',
          addressLocality: STUDIO_LOCALITY,
          addressRegion: STUDIO_REGION,
          addressCountry: STUDIO_COUNTRY,
        },
        /* Bussoleno is where the studio is, Susa is a town she also covers.
           Both are cities served; only the first is the address above. Naming
           Susa explicitly rather than leaning on "Valle di Susa" alone is what
           makes the town match a query for it: the valley is an administrative
           area, and a search for "personal trainer Susa" is a city search. */
        areaServed: [
          { '@type': 'City', name: STUDIO_LOCALITY },
          { '@type': 'City', name: AREA_SERVED_ALSO },
          { '@type': 'AdministrativeArea', name: 'Valle di Susa' },
        ],
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
