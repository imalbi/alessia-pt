import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();
  const vat = process.env.NEXT_PUBLIC_VAT_NUMBER;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <footer
      className="border-t px-4 py-12 md:py-16"
      style={{ borderColor: 'var(--ink-15)', background: 'var(--paper)' }}
    >
      <div className="mx-auto flex max-w-screen-xl flex-col gap-6 md:flex-row md:items-end md:justify-between md:px-4 lg:px-8">
        <div>
          <div className="text-2xl font-extrabold" style={{ fontFamily: 'var(--font-display)' }}>
            Alessia
          </div>
          <div
            className="mt-1 text-sm"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('tagline')}
          </div>
        </div>
        <div
          className="flex flex-col gap-2 text-sm md:items-end"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
        >
          {email && (
            <a href={`mailto:${email}`} className="hover:text-[color:var(--ink)]">
              {email}
            </a>
          )}
          {vat && (
            <div>
              {t('vatLabel')}: {vat}
            </div>
          )}
          <Link href="/privacy" className="hover:text-[color:var(--ink)]">
            {t('privacy')}
          </Link>
          <div>
            © {year} Alessia · {t('rights')}
          </div>
        </div>
      </div>
    </footer>
  );
}
