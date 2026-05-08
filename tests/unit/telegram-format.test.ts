import { describe, it, expect } from 'vitest';
import { formatTelegramMessage } from '@/lib/telegram';

describe('formatTelegramMessage', () => {
  it('produces a stable markdown snapshot for full payload', () => {
    const result = formatTelegramMessage({
      name: 'Marta Rossi',
      email: 'marta@example.com',
      phone: '+39 333 1234567',
      goal: 'postura',
      message: 'Vorrei lavorare sulla postura cronica.',
      consent: true,
      honeypot: '',
    });
    expect(result).toMatchInlineSnapshot(`
      "💪 *Nuovo contatto sito*
      *Marta Rossi* — marta@example.com
      📞 +39 333 1234567
      🎯 postura

      Vorrei lavorare sulla postura cronica."
    `);
  });

  it('omits phone and goal when missing', () => {
    const result = formatTelegramMessage({
      name: 'John',
      email: 'j@x.it',
      message: 'Ciao volevo informazioni.',
      consent: true,
      honeypot: '',
    });
    expect(result).toContain('*John* — j@x.it');
    expect(result).not.toContain('📞');
    expect(result).not.toContain('🎯');
  });

  it('escapes telegram-markdown special chars in name', () => {
    const result = formatTelegramMessage({
      name: 'A_B*C',
      email: 'x@y.it',
      message: 'Test message body.',
      consent: true,
      honeypot: '',
    });
    // underscore and asterisk should be escaped
    expect(result).toContain('A\\_B\\*C');
  });
});
