import { Resend } from 'resend';
import ContactEmail from '@/emails/contact-email';
import type { ContactInput } from './validation/contact';

export async function sendEmail(input: ContactInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO;
  if (!apiKey || !from || !to) {
    throw new Error('email_env_missing');
  }
  const resend = new Resend(apiKey);
  const subject = `Nuovo contatto · ${input.name}${input.goal ? ` (${input.goal})` : ''}`;
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email || undefined,
    subject,
    react: ContactEmail({ data: input }),
  });
  if (error) {
    // Same reasoning as the Telegram client: the name buckets a whole class of
    // causes, the message says which one.
    throw new Error(`email_failed_${error.name}: ${error.message}`);
  }
}
