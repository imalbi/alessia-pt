import type { ContactInput } from './validation/contact';

const ESCAPE = /([_*\[\]()~`>#+\-=|{}.!\\])/g;

function escapeMd(s: string) {
  return s.replace(ESCAPE, '\\$1');
}

/**
 * Every interpolated value is escaped, not just the name.
 *
 * MarkdownV2 reserves 18 characters and rejects the whole message if any of
 * them appears unescaped: the API answers 400 "Can't parse entities". Escaping
 * only the name passed the snapshot test and failed every real submission,
 * because an email address always contains a dot, a phone number carries '+'
 * and '-', and a sentence ends in '.'. The only literal markup here is the
 * pair of asterisks around the name and the separators, which are ours.
 */
export function formatTelegramMessage(input: ContactInput): string {
  const lines = [
    '💪 *Nuovo contatto sito*',
    `*${escapeMd(input.name)}* · ${escapeMd(input.email)}`,
  ];
  if (input.phone) lines.push(`📞 ${escapeMd(input.phone)}`);
  if (input.goal) lines.push(`🎯 ${escapeMd(input.goal)}`);
  lines.push('', escapeMd(input.message));
  return lines.join('\n');
}

export async function sendTelegram(input: ContactInput): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error('telegram_env_missing');
  }
  const text = formatTelegramMessage(input);
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'MarkdownV2',
    }),
  });
  if (!res.ok) {
    // The status alone is not actionable: 403 covers "bot is not a member of
    // that chat", "bot was blocked" and "user is deactivated", which need
    // completely different fixes. Telegram puts the difference in
    // `description`, so carry it rather than discard it.
    const detail = await res
      .json()
      .then((b: { description?: string }) => b.description)
      .catch(() => undefined);
    throw new Error(`telegram_failed_${res.status}${detail ? `: ${detail}` : ''}`);
  }
}
