import type { ContactInput } from './validation/contact';

const ESCAPE = /([_*\[\]()~`>#+\-=|{}.!\\])/g;

function escapeMd(s: string) {
  return s.replace(ESCAPE, '\\$1');
}

export function formatTelegramMessage(input: ContactInput): string {
  const lines = ['💪 *Nuovo contatto sito*', `*${escapeMd(input.name)}* — ${input.email}`];
  if (input.phone) lines.push(`📞 ${input.phone}`);
  if (input.goal) lines.push(`🎯 ${input.goal}`);
  lines.push('', input.message);
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
    throw new Error(`telegram_failed_${res.status}`);
  }
}
