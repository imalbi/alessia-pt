'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { contactSchema, type ContactInput, GOALS } from '@/lib/validation/contact';
import { Button } from '@/components/ui/button';
import { Scribble } from '@/components/primitives/scribble';

const goalKey = (g: string) => `goal_${g.replace('-', '_')}` as const;

export function Contact() {
  const t = useTranslations('Contact');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: { honeypot: '', consent: false as unknown as true },
  });

  const onSubmit = async (data: ContactInput) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast.success(t('success'));
      reset();
    } catch {
      toast.error(t('error', { email: 'alessia@example.com' }), {
        action: { label: t('retry'), onClick: () => onSubmit(data) },
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Inline-styled inputs/textareas to avoid the shadcn v3 token mismatch.
  const fieldStyle = {
    fontFamily: 'var(--font-body)',
    background: 'transparent',
    border: '1px solid var(--ink-30)',
    borderRadius: 2,
    padding: '10px 12px',
    fontSize: 16, // ≥16px to avoid iOS zoom
    color: 'var(--ink)',
    width: '100%',
    minHeight: 44,
  } as const;

  return (
    <section id="contact" className="mx-auto max-w-screen-xl px-4 py-24 md:px-8 md:py-32 lg:px-12">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <div>
          <h2
            className="text-[clamp(2rem,4vw+0.8rem,3.5rem)] leading-tight font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('heading')}
          </h2>
          <div className="relative mt-2 w-32">
            <Scribble kind="underline" />
          </div>
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('lead')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          {/* honeypot — hidden offscreen */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            style={{ position: 'absolute', left: -9999, width: 1, height: 1 }}
            {...register('honeypot')}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm"
                style={{ color: 'var(--ink-70)' }}
              >
                {t('name')}
              </label>
              <input
                id="name"
                {...register('name')}
                aria-invalid={!!errors.name}
                style={fieldStyle}
              />
              {errors.name && (
                <p className="mt-1 text-sm" style={{ color: 'var(--accent-deep)' }}>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm"
                style={{ color: 'var(--ink-70)' }}
              >
                {t('email')}
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                aria-invalid={!!errors.email}
                style={fieldStyle}
              />
              {errors.email && (
                <p className="mt-1 text-sm" style={{ color: 'var(--accent-deep)' }}>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="phone"
                className="mb-1 block text-sm"
                style={{ color: 'var(--ink-70)' }}
              >
                {t('phone')}
              </label>
              <input id="phone" type="tel" {...register('phone')} style={fieldStyle} />
            </div>
            <div>
              <label
                htmlFor="goal"
                className="mb-1 block text-sm"
                style={{ color: 'var(--ink-70)' }}
              >
                {t('goal')}
              </label>
              <select
                id="goal"
                {...register('goal', {
                  setValueAs: (v: string) => (v === '' ? undefined : v),
                })}
                style={fieldStyle}
              >
                <option value="">{t('goalSelect')}</option>
                {GOALS.map((g) => (
                  <option key={g} value={g}>
                    {t(goalKey(g))}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm"
              style={{ color: 'var(--ink-70)' }}
            >
              {t('message')}
            </label>
            <textarea
              id="message"
              rows={6}
              {...register('message')}
              aria-invalid={!!errors.message}
              style={{ ...fieldStyle, resize: 'vertical', minHeight: 140 }}
            />
            {errors.message && (
              <p className="mt-1 text-sm" style={{ color: 'var(--accent-deep)' }}>
                {errors.message.message}
              </p>
            )}
          </div>

          <label
            className="flex items-start gap-3 text-sm leading-relaxed"
            style={{ color: 'var(--ink-70)' }}
          >
            <input
              type="checkbox"
              {...register('consent')}
              className="mt-1"
              style={{ accentColor: 'var(--accent)' }}
            />
            <span>{t('consent')}</span>
          </label>

          <div>
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? t('sending') : t('submit')}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
