import { describe, it, expect } from 'vitest';
import { contactSchema } from '@/lib/validation/contact';

const valid = {
  name: 'Marta Rossi',
  phone: '+39 333 1234567',
  message: 'Vorrei lavorare sulla postura.',
  consent: true,
  honeypot: '',
};

describe('contactSchema', () => {
  it('accepts a minimum valid payload', () => {
    expect(() => contactSchema.parse(valid)).not.toThrow();
  });

  it('accepts optional email', () => {
    expect(() => contactSchema.parse({ ...valid, email: 'marta@example.com' })).not.toThrow();
  });

  it('rejects empty phone', () => {
    expect(() => contactSchema.parse({ ...valid, phone: '' })).toThrow();
  });

  it('rejects invalid phone', () => {
    expect(() => contactSchema.parse({ ...valid, phone: '123' })).toThrow();
  });

  it('rejects empty name', () => {
    expect(() => contactSchema.parse({ ...valid, name: '' })).toThrow();
  });

  it('rejects invalid email', () => {
    expect(() => contactSchema.parse({ ...valid, email: 'not-an-email' })).toThrow();
  });

  it('rejects message shorter than 10 chars', () => {
    expect(() => contactSchema.parse({ ...valid, message: 'short' })).toThrow();
  });

  it('rejects message longer than 2000 chars', () => {
    expect(() => contactSchema.parse({ ...valid, message: 'a'.repeat(2001) })).toThrow();
  });

  it('rejects consent=false', () => {
    expect(() => contactSchema.parse({ ...valid, consent: false })).toThrow();
  });

  it('rejects honeypot non-empty', () => {
    expect(() => contactSchema.parse({ ...valid, honeypot: 'bot' })).toThrow();
  });

  it('accepts known goal value', () => {
    expect(() => contactSchema.parse({ ...valid, goal: 'postura' })).not.toThrow();
  });

  it('rejects unknown goal value', () => {
    expect(() => contactSchema.parse({ ...valid, goal: 'unknown' })).toThrow();
  });
});
