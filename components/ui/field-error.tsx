'use client';

import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
  /**
   * Error key from the zod schema (e.g. "name_too_short"). Looked up under
   * the ContactErrors namespace and rendered with an icon + slide/fade-in.
   * Pass undefined to dismiss.
   */
  messageKey?: string;
  /** id used by aria-describedby on the related input. */
  id?: string;
}

export function FieldError({ messageKey, id }: Props) {
  const t = useTranslations('ContactErrors');
  return (
    <AnimatePresence initial={false}>
      {messageKey ? (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.2, ease: [0.2, 0.7, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 6,
            marginTop: 6,
            color: 'var(--accent)',
            fontSize: 13,
            fontFamily: 'var(--font-body)',
            lineHeight: 1.4,
            overflow: 'hidden',
          }}
        >
          <AlertCircle
            size={14}
            strokeWidth={2}
            style={{ marginTop: 2, flexShrink: 0 }}
            aria-hidden
          />
          <span>{safeT(t, messageKey)}</span>
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

function safeT(t: ReturnType<typeof useTranslations>, key: string) {
  // next-intl throws on missing keys at runtime; wrap to keep raw keys
  // out of production output if a new zod error is added without a
  // matching translation.
  try {
    return t(key as never);
  } catch {
    return key;
  }
}
