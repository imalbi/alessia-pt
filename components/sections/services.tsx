import { useLocale, useTranslations } from 'next-intl';
import { services as servicesIt } from '@/content/it';
import { services as servicesEn } from '@/content/en';
import { Scribble } from '@/components/primitives/scribble';

export function Services() {
  const t = useTranslations('Services');
  const locale = useLocale();
  const items = locale === 'en' ? servicesEn : servicesIt;

  return (
    <section
      id="services"
      className="relative px-4 py-24 md:py-32 lg:py-36"
      style={{ background: 'var(--paper-2)' }}
    >
      <div className="mx-auto max-w-screen-xl md:px-4 lg:px-8">
        <div className="mb-12 max-w-2xl md:mb-16">
          <h2
            className="text-[clamp(2rem,4vw+0.8rem,3.5rem)] leading-tight font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('heading')}
          </h2>
          <div className="relative mt-2 w-40">
            <Scribble kind="underline-double" />
          </div>
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('lead')}
          </p>
        </div>

        <ul className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {items.map((s) => {
            const Icon = s.icon;
            const emphasisClass = s.emphasis ? 'lg:col-span-2 lg:row-span-1' : '';
            return (
              <li
                key={s.id}
                className={`flex gap-5 border-t pt-8 ${emphasisClass}`}
                style={{ borderColor: 'var(--ink-15)' }}
              >
                <div
                  className="shrink-0 pt-1"
                  style={{ color: s.emphasis ? 'var(--accent)' : 'var(--ink-70)' }}
                >
                  <Icon size={28} strokeWidth={1.5} aria-hidden />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                    {s.title}
                  </h3>
                  <p
                    className="mt-3 leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
                  >
                    {s.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
