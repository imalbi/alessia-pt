'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Photo } from '@/components/primitives/photo';
import { Scribble } from '@/components/primitives/scribble';
import { Button } from '@/components/ui/button';

const EASE = [0.16, 1, 0.3, 1] as const; // ease-out-expo

export function Hero() {
  const t = useTranslations('Hero');
  const reduced = useReducedMotion();

  const transition = (delay: number) =>
    reduced ? { duration: 0 } : { duration: 0.7, delay, ease: EASE };

  return (
    <section className="relative mx-auto max-w-screen-xl px-4 pt-24 pb-12 md:px-8 md:pt-32 md:pb-16 lg:px-12 lg:pt-40">
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16 lg:gap-20">
        <div>
          <motion.h1
            initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
            transition={transition(0.15)}
            className="text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[0.95] font-extrabold tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            {t('name')}
            <br />
            <span style={{ color: 'var(--ink-70)', fontWeight: 500 }}>{t('role')}</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition(0.8)}
            className="mt-1 max-w-[18rem]"
          >
            <Scribble kind="underline" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.4)}
            className="mt-8 max-w-prose text-[clamp(1.125rem,0.5vw+1rem,1.25rem)] leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)' }}
          >
            {t('tagline')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.6)}
            className="mt-10"
          >
            <Button asChild size="lg">
              <a href="#contact">{t('cta')}</a>
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ x: 24, opacity: 0, scale: 1.02 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={transition(0)}
          className="relative"
        >
          <Photo ratio="4/5" label={t('photoLabel')} priority />
        </motion.div>
      </div>
    </section>
  );
}
