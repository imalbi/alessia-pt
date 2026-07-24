'use client';

import { useState } from 'react';
import { useForm, Controller, type FieldPath, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { contactSchema, type ContactInput, GOALS } from '@/lib/validation/contact';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FieldError } from '@/components/ui/field-error';
import { Reveal } from '@/components/primitives/reveal';
import { Scribble } from '@/components/primitives/scribble';

const goalKey = (g: string) => `goal_${g.replace('-', '_')}` as const;

function RequiredMark({ label }: { label: string }) {
  return (
    <span aria-label={label} style={{ color: 'var(--accent)', marginLeft: 2 }}>
      *
    </span>
  );
}

export function Contact() {
  const t = useTranslations('Contact');
  const [submitting, setSubmitting] = useState(false);

  const studioCity = process.env.NEXT_PUBLIC_STUDIO_CITY;
  const modes = process.env.NEXT_PUBLIC_STUDIO_MODES; // e.g. "studio + online"

  const [errorCount, setErrorCount] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: { honeypot: '', consent: false as unknown as true },
  });

  // Field display order — used to find the *first* errored field on submit fail.
  const FIELD_ORDER: FieldPath<ContactInput>[] = [
    'name',
    'email',
    'phone',
    'goal',
    'message',
    'consent',
  ];

  const onInvalid = (errs: FieldErrors<ContactInput>) => {
    const count = FIELD_ORDER.reduce((n, f) => (errs[f] ? n + 1 : n), 0);
    setErrorCount(count);
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) {
      // Radix Select trigger does not support setFocus; fall back to DOM focus by id.
      try {
        setFocus(first);
      } catch {
        document.getElementById(first)?.focus();
      }
    }
  };

  const onSubmit = async (data: ContactInput) => {
    setSubmitting(true);
    setErrorCount(0);
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
      const fallback = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
      toast.error(
        fallback ? t('error', { email: fallback }) : t('errorNoEmail'),
        {
          action: { label: t('retry'), onClick: () => onSubmit(data) },
        },
      );
    } finally {
      setSubmitting(false);
    }
  };

  const requiredMark = t('requiredMark');

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
      <Reveal className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <div>
          <h2
            className="text-[clamp(2rem,4vw+0.8rem,3.5rem)] leading-tight font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('heading')}
          </h2>
          <div className="mt-1 w-[clamp(7rem,15vw,13rem)]">
            <Scribble kind="underline" />
          </div>
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('lead')}
          </p>

          <dl
            className="mt-10 border-t pt-6 text-sm"
            style={{
              borderColor: 'var(--ink-30)',
              fontFamily: 'var(--font-body)',
              color: 'var(--ink-70)',
            }}
          >
            {studioCity && (
              <div className="flex justify-between gap-6 py-1.5">
                <dt style={{ color: 'var(--ink-55)' }}>{t('practicalCity')}</dt>
                <dd style={{ color: 'var(--ink)' }}>{studioCity}</dd>
              </div>
            )}
            {modes && (
              <div className="flex justify-between gap-6 py-1.5">
                <dt style={{ color: 'var(--ink-55)' }}>{t('practicalModes')}</dt>
                <dd style={{ color: 'var(--ink)' }}>{modes}</dd>
              </div>
            )}
            <div className="flex justify-between gap-6 py-1.5">
              <dt style={{ color: 'var(--ink-55)' }}>{t('practicalPricing')}</dt>
              <dd style={{ color: 'var(--ink)' }}>{t('practicalPricingValue')}</dd>
            </div>
            <div className="flex justify-between gap-6 py-1.5">
              <dt style={{ color: 'var(--ink-55)' }}>{t('practicalReply')}</dt>
              <dd style={{ color: 'var(--ink)' }}>{t('practicalReplyValue')}</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="flex flex-col gap-5">
          {/* honeypot — hidden offscreen */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            style={{ position: 'absolute', left: -9999, width: 1, height: 1 }}
            {...register('honeypot')}
          />

          <p
            className="text-xs"
            style={{ color: 'var(--ink-55)', fontFamily: 'var(--font-body)' }}
          >
            {t('requiredLegend')}
          </p>

          {/* SR-only live summary — assistive tech announces error count
              on invalid submit. Visible focus already lands on first field. */}
          <div role="status" aria-live="polite" className="sr-only">
            {errorCount === 1 && t('errorSummaryOne')}
            {errorCount > 1 && t('errorSummaryMany', { count: errorCount })}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm"
                style={{ color: 'var(--ink-70)' }}
              >
                {t('name')}
                <RequiredMark label={requiredMark} />
              </label>
              <input
                id="name"
                {...register('name')}
                autoComplete="name"
                required
                aria-required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                style={fieldStyle}
              />
              <FieldError id="name-error" messageKey={errors.name?.message} />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm"
                style={{ color: 'var(--ink-70)' }}
              >
                {t('email')}
                <RequiredMark label={requiredMark} />
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                autoComplete="email"
                inputMode="email"
                required
                aria-required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                style={fieldStyle}
              />
              <FieldError id="email-error" messageKey={errors.email?.message} />
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
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                style={fieldStyle}
              />
              <FieldError id="phone-error" messageKey={errors.phone?.message} />
            </div>
            <div>
              <label
                htmlFor="goal"
                className="mb-1 block text-sm"
                style={{ color: 'var(--ink-70)' }}
              >
                {t('goal')}
              </label>
              <Controller
                name="goal"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(v) => field.onChange(v === '' ? undefined : v)}
                    value={field.value ?? ''}
                  >
                    <SelectTrigger
                      id="goal"
                      ref={field.ref}
                      onBlur={field.onBlur}
                      aria-invalid={!!errors.goal}
                    >
                      <SelectValue placeholder={t('goalSelect')} />
                    </SelectTrigger>
                    <SelectContent>
                      {GOALS.map((g) => (
                        <SelectItem key={g} value={g}>
                          {t(goalKey(g))}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError id="goal-error" messageKey={errors.goal?.message} />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm"
              style={{ color: 'var(--ink-70)' }}
            >
              {t('message')}
              <RequiredMark label={requiredMark} />
            </label>
            <textarea
              id="message"
              rows={6}
              {...register('message')}
              required
              aria-required
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              style={{ ...fieldStyle, resize: 'vertical', minHeight: 140 }}
            />
            <FieldError id="message-error" messageKey={errors.message?.message} />
          </div>

          <div>
            <label
              className="flex items-start gap-3 text-sm leading-relaxed"
              style={{ color: 'var(--ink-70)' }}
            >
              <input
                type="checkbox"
                {...register('consent')}
                required
                aria-required
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? 'consent-error' : undefined}
                className="mt-1"
                style={{ accentColor: 'var(--accent)' }}
              />
              <span>
                {t.rich('consent', {
                  link: (chunks) => (
                    <Link
                      href="/privacy"
                      className="underline underline-offset-2"
                      style={{ color: 'var(--accent)' }}
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </span>
            </label>
            <FieldError id="consent-error" messageKey={errors.consent?.message} />
          </div>

          <div>
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? t('sending') : t('submit')}
            </Button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
