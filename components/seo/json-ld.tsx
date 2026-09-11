import {
  SITE_NAME,
  SITE_DESCRIPTION_IT,
  STUDIO_LOCALITY,
  STUDIO_STREET_ADDRESS,
  STUDIO_POSTAL_CODE,
  AREA_SERVED_ALSO,
  STUDIO_REGION,
  STUDIO_COUNTRY,
  INSTAGRAM_URL,
  getSiteUrl,
} from '@/i18n/metadata';

export function JsonLd() {
  const url = getSiteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${url}#alessia`,
        name: SITE_NAME,
        givenName: 'Alessia',
        familyName: 'Alfano',
        jobTitle: 'Personal Trainer e Chinesiologa',
        url,
        image: `${url}/og.jpg`,
        sameAs: [INSTAGRAM_URL],
        /* Tracks the keyword band under the hero, plus the qualification itself:
           Chinesiologia left the band but stays here, because in a local result
           it is the word that separates her from any personal trainer. The band
           runs "Tonificazione e dimagrimento" as one phrase; `knowsAbout` is a
           list of topics, so the conjunction is split into two entries. */
        knowsAbout: [
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
        description: SITE_DESCRIPTION_IT,
        url,
        image: `${url}/og.jpg`,
        founder: { '@id': `${url}#alessia` },
        employee: { '@id': `${url}#alessia` },
        sameAs: [INSTAGRAM_URL],
        address: {
          '@type': 'PostalAddress',
          streetAddress: STUDIO_STREET_ADDRESS,
          postalCode: STUDIO_POSTAL_CODE,
          addressLocality: STUDIO_LOCALITY,
          addressRegion: STUDIO_REGION,
          addressCountry: STUDIO_COUNTRY,
        },
        /* Susa is where she trains (Élite Fitness Club), Bussoleno is a nearby
           town she also covers. Both are cities served; Susa is the address
           locality above. */
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
