// scripts/get-telegram-chat-id.ts
//
// Helper one-shot per recuperare TELEGRAM_CHAT_ID dopo aver creato il bot.
// Usage:
//   1. Crea bot con @BotFather, copia il token.
//   2. Avvia chat con il bot e mandagli /start.
//   3. TELEGRAM_BOT_TOKEN=xxx yarn telegram:chat-id

interface Update {
  message?: { chat: { id: number; username?: string; first_name?: string } };
}
interface ApiResponse {
  ok: boolean;
  result: Update[];
  description?: string;
}

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('Set TELEGRAM_BOT_TOKEN in env');
  process.exit(1);
}

const url = `https://api.telegram.org/bot${token}/getUpdates`;
const response = await fetch(url);
const data = (await response.json()) as ApiResponse;

if (!data.ok) {
  console.error('API error:', data.description ?? 'unknown');
  process.exit(1);
}
if (!data.result.length) {
  console.error('No updates yet. Send /start to your bot, then re-run.');
  process.exit(1);
}

const chats = new Map<number, string>();
for (const u of data.result) {
  const c = u.message?.chat;
  if (c) chats.set(c.id, c.username ?? c.first_name ?? 'unknown');
}
console.log('Chats found:');
for (const [id, name] of chats) console.log(`  ${id}  (${name})`);
console.log('\nSet TELEGRAM_CHAT_ID to the desired id in your env.');

export {};
