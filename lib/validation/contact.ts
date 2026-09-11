import { z } from 'zod';

export const GOALS = ['postura', 'recupero', 'online', 'in-studio', 'altro'] as const;
export type Goal = (typeof GOALS)[number];

export const contactSchema = z.object({
  name: z.string().min(2, 'name_too_short').max(80, 'name_too_long'),
  phone: z
    .string()
    .min(1, 'phone_required')
    .regex(/^[+0-9\s\-()]{6,20}$/, 'phone_invalid'),
  email: z
    .string()
    .email('email_invalid')
    .optional()
    .or(z.literal('')),
  goal: z.enum(GOALS).optional(),
  message: z.string().min(10, 'message_too_short').max(2000, 'message_too_long'),
  consent: z.literal(true, { error: () => 'consent_required' }),
  honeypot: z.string().max(0, 'honeypot_filled'),
});

export type ContactInput = z.infer<typeof contactSchema>;
