import { describe, expect, it } from 'vitest';
import {
  CONTACT_LIMITS,
  RATE_LIMIT,
  cleanContactInput,
  contactEmail,
  isRateLimited,
  validateContact
} from '~/lib/contact';

const valid = {
  name: 'Marieke Okkerse',
  email: 'marieke@okkerse.nl',
  message: 'We need a new website before the spring season starts.',
  website: ''
};

describe('cleanContactInput', () => {
  it('trims, collapses spaces, and lowercases the email', () => {
    expect(
      cleanContactInput({ name: '  Lotte   Okkerse ', email: ' Lotte@Okkerse.NL ', message: ' Hi\r\nthere ', website: '' })
    ).toEqual({ name: 'Lotte Okkerse', email: 'lotte@okkerse.nl', message: 'Hi\nthere', website: '' });
  });

  it('turns missing or non-string fields into empty strings', () => {
    expect(cleanContactInput({ name: 42, email: null })).toEqual({ name: '', email: '', message: '', website: '' });
    expect(cleanContactInput('nonsense')).toEqual({ name: '', email: '', message: '', website: '' });
  });
});

describe('validateContact', () => {
  it('accepts a complete message', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it('rejects a missing name, a broken email, and a short message', () => {
    const errors = validateContact({ ...valid, name: 'A', email: 'marieke@okkerse', message: 'Hello' });
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name']);
  });

  it('rejects messages over the limit', () => {
    const errors = validateContact({ ...valid, message: 'x'.repeat(CONTACT_LIMITS.message.max + 1) });
    expect(errors.message).toBeDefined();
  });
});

describe('isRateLimited', () => {
  it('allows messages until the limit and blocks from then on', () => {
    expect(isRateLimited(0)).toBe(false);
    expect(isRateLimited(RATE_LIMIT.max - 1)).toBe(false);
    expect(isRateLimited(RATE_LIMIT.max)).toBe(true);
  });
});

describe('contactEmail', () => {
  it('escapes HTML from the sender', () => {
    const mail = contactEmail({ ...valid, name: '<b>Kees</b>', message: '<script>alert(1)</script>' }, 'Nightshift Studio');
    expect(mail.html).not.toContain('<script>');
    expect(mail.html).toContain('&#60;script&#62;');
    expect(mail.text).toContain('<script>alert(1)</script>');
    expect(mail.subject).toBe('New message from <b>Kees</b>');
  });
});
