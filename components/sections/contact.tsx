'use client';

import { useState } from 'react';
import { useForm, Controller, type FieldPath, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { contactSchema, type ContactInput, GOALS } from '@/lib/validation/contact';
import { Link } from '@/i18n/routing';
import { STUDIO_LOCALITY, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/i18n/metadata';
import { InstagramIcon } from '@/components/icons/instagram';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FieldError } from '@/components/ui/field-error';
import { Parallax } from '@/components/primitives/parallax';

const goalKey = (g: string) => `goal_${g.replace('-', '_')}` as const;

/** Field labels share the mono meta voice with every other label on the page. */
const LABEL = 'mono-cap mb-2 block';

function RequiredMark({ label }: { label: string }) {
  return (
    <span aria-label={label} style={{ color: 'var(--accent)', marginLeft: 2 }}>
      *
    </span>
  );
}

export function Contact() {
  const t = useTranslations('Contact');
  const watermark = t('watermark');
  const tp = useTranslations('Pointer');
  const [submitting, setSubmitting] = useState(false);

  // The city is a constant, not an env var: it is also in the structured data
  // and in the page title, and those three have to say the same word.
  const studioCity = STUDIO_LOCALITY;
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
      toast.error(fallback ? t('error', { email: fallback }) : t('errorNoEmail'), {
        action: { label: t('retry'), onClick: () => onSubmit(data) },
      });
    } finally {
      setSubmitting(false);
    }
  };

  const requiredMark = t('requiredMark');

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-[5vw] py-[clamp(80px,12vh,150px)]"
      style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--ink-15)' }}
    >
      {/* Outlined wordmark bleeding off the bottom edge. Decorative, so it is
          hidden from assistive tech and drawn at 8% ink, which keeps it a
          texture rather than something competing with the form. */}
      <Parallax
        speed={0.1}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 text-center leading-[0.8] font-extrabold uppercase"
        style={{
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.06em',
          /* Sized from the word rather than hand-tuned to one of them. `18vw`
             was set against an eight-letter "Scrivimi": the same value spilled
             over the edge the moment the word grew, and had always undersized
             the five-letter English one. 144 is that original budget (8 x 18vw)
             shared out over however many letters the locale actually has.
             Letter widths are not equal, so this is an approximation, and the
             clamp is what keeps it from getting silly at either end. */
          fontSize: `clamp(3.5rem, ${(144 / Math.max(watermark.length, 1)).toFixed(1)}vw, 20rem)`,
          // See the footer wordmark: stroke-then-fill hides the font's unmerged
          // internal contours. Fill is `--paper-2`, this section's surface.
          color: 'var(--paper-2)',
          paintOrder: 'stroke fill',
          WebkitTextStroke: '1px var(--ink-08)',
          /* Bleed tied to the type, not to the section. A percentage offset is
             resolved against the containing block's height, and this section is
             ~800px on a desktop but well over 1400px on a phone once the form
             stacks into one column: the same `-6%` that trimmed the descenders
             on desktop pushed the whole word below the clip on mobile, leaving
             only the tips of the letters. In `em` the bleed is a constant
             fraction of the word at every size. */
          bottom: '-0.18em',
        }}
      >
        {watermark}
      </Parallax>

      <div className="relative mx-auto grid max-w-[1500px] gap-[clamp(34px,5vw,80px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <p
            data-rev
            className="mono-cap"
            style={{ color: 'var(--accent)', letterSpacing: '0.22em' }}
          >
            {t('eyebrow')}
          </p>
          <h2
            data-rev
            className="mt-4 max-w-[12ch] text-[clamp(2.4rem,6vw,5rem)] leading-[0.94] font-extrabold"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.045em' }}
          >
            {t('heading')}
          </h2>
          <p
            data-rev
            className="mt-5 max-w-[44ch] text-[1.02rem] leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('lead')}
          </p>

          <dl
            className="mt-10 grid max-w-[420px] gap-4 pt-5"
            style={{ borderTop: '1px solid var(--gold)', fontFamily: 'var(--font-body)' }}
          >
            {studioCity && (
              <div className="flex justify-between gap-4">
                <dt className="mono-cap" style={{ color: 'var(--ink-55)' }}>
                  {t('practicalCity')}
                </dt>
                <dd className="m-0 text-[14.5px]" style={{ color: 'var(--ink-70)' }}>
                  {studioCity}
                </dd>
              </div>
            )}
            {modes && (
              <div className="flex justify-between gap-4">
                <dt className="mono-cap" style={{ color: 'var(--ink-55)' }}>
                  {t('practicalModes')}
                </dt>
                <dd className="m-0 text-[14.5px]" style={{ color: 'var(--ink-70)' }}>
                  {modes}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <dt className="mono-cap" style={{ color: 'var(--ink-55)' }}>
                {t('practicalPricing')}
              </dt>
              <dd className="m-0 text-[14.5px]" style={{ color: 'var(--ink-70)' }}>
                {t('practicalPricingValue')}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="mono-cap" style={{ color: 'var(--ink-55)' }}>
                {t('practicalReply')}
              </dt>
              <dd className="m-0 text-[14.5px]" style={{ color: 'var(--ink-70)' }}>
                {t('practicalReplyValue')}
              </dd>
            </div>
            {/* Last on purpose. The rows above answer "how does this work", and
                this one answers the question they raise: if the form is not your
                way of writing to someone, here is the other one. */}
            {/* The only row here whose value cannot be shortened: at 320px the
                label, the gap and the handle come to exactly the width of the
                list, with nothing to spare. Wrapping is what it does instead of
                overflowing if anything about it ever grows. */}
            <div className="flex flex-wrap justify-between gap-4">
              <dt className="mono-cap" style={{ color: 'var(--ink-55)' }}>
                {t('practicalInstagram')}
              </dt>
              <dd className="m-0 text-[14.5px]">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram @${INSTAGRAM_HANDLE}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--ink)]"
                  style={{ color: 'var(--ink-70)' }}
                >
                  @{INSTAGRAM_HANDLE}
                  <InstagramIcon size={15} />
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* Deliberately not `data-rev`. Getting a message sent is the one job
            this page has, and a revealed form spends its first second at
            opacity 0, translated 30px, waiting on an IntersectionObserver.
            Headings can afford that entrance; the form cannot. */}
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          noValidate
          className="flex flex-col gap-5"
        >
          {/* honeypot — hidden offscreen */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            style={{ position: 'absolute', left: -9999, width: 1, height: 1 }}
            {...register('honeypot')}
          />

          <p className="text-xs" style={{ color: 'var(--ink-55)', fontFamily: 'var(--font-body)' }}>
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
              <label htmlFor="name" className={LABEL} style={{ color: 'var(--ink-55)' }}>
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
                className="field-control"
              />
              <FieldError id="name-error" messageKey={errors.name?.message} />
            </div>
            <div>
              <label htmlFor="email" className={LABEL} style={{ color: 'var(--ink-55)' }}>
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
                className="field-control"
              />
              <FieldError id="email-error" messageKey={errors.email?.message} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className={LABEL} style={{ color: 'var(--ink-55)' }}>
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
                className="field-control"
              />
              <FieldError id="phone-error" messageKey={errors.phone?.message} />
            </div>
            <div>
              <label htmlFor="goal" className={LABEL} style={{ color: 'var(--ink-55)' }}>
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
            <label htmlFor="message" className={LABEL} style={{ color: 'var(--ink-55)' }}>
              {t('message')}
              <RequiredMark label={requiredMark} />
            </label>
            {/* Persistent helper rather than a placeholder: the guidance is the
                hard part of this field, and a placeholder disappears the moment
                someone starts typing. */}
            <p
              id="message-hint"
              className="mb-2 text-[13px] leading-snug"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-55)' }}
            >
              {t('messageHint')}
            </p>
            <textarea
              id="message"
              rows={6}
              {...register('message')}
              required
              aria-required
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error message-hint' : 'message-hint'}
              className="field-control min-h-[140px] resize-y"
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
                className="mt-1 shrink-0"
                /* Default UA checkboxes render around 13px, which is small for
                   the one control that gates the whole form. */
                style={{ accentColor: 'var(--accent)', width: 17, height: 17 }}
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
            {/* Same object as the hero CTA: pill, accent hairline, accent wash on
                hover. The page has exactly two primary actions and they should
                not look like two different components. */}
            <button
              type="submit"
              disabled={submitting}
              // Short label: the disc is 88px and "Invia il messaggio" runs past
              // the edge of it. The button's own text stays the long form.
              data-cursor={tp('send')}
              className="inline-flex min-h-11 cursor-pointer items-center rounded-full px-7 py-4 text-[15px] font-bold transition-colors hover:bg-[color:var(--accent-15)] disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                border: '1px solid var(--accent)',
                background: 'transparent',
                color: 'var(--ink)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {submitting ? t('sending') : t('submit')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
