import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations('Home');
  return (
    <main className="mx-auto max-w-screen-xl px-4 py-24 md:px-8 lg:px-12">
      <h1
        className="text-5xl font-extrabold tracking-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {t('title')}
      </h1>
      <p
        className="mt-4 text-lg"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
      >
        {t('subtitle')}. {t('tagline')}
      </p>
    </main>
  );
}
