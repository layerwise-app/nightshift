/** Contact form rules, shared by the form and the server. No server-only imports here. */

export const CONTACT_LIMITS = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  message: { min: 20, max: 5000 }
} as const;

/** At most this many messages from one sender inside the window. */
export const RATE_LIMIT = { max: 3, windowMinutes: 15 } as const;

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  /** Honeypot. People never see this field; bots fill it in. */
  website: string;
};

export type ContactField = 'name' | 'email' | 'message';
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/** Trims and normalises raw input from the browser. */
export function cleanContactInput(raw: unknown): ContactInput {
  const data = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  return {
    name: text(data.name).replace(/\s+/g, ' ').trim(),
    email: text(data.email).trim().toLowerCase(),
    message: text(data.message).replace(/\r\n/g, '\n').trim(),
    website: text(data.website).trim()
  };
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const { name, email, message } = input;
  if (name.length < CONTACT_LIMITS.name.min) errors.name = 'Tell us your name.';
  else if (name.length > CONTACT_LIMITS.name.max) errors.name = `Keep your name under ${CONTACT_LIMITS.name.max} characters.`;

  if (!email) errors.email = 'We need an email address to reply to.';
  else if (email.length > CONTACT_LIMITS.email.max || !EMAIL.test(email)) errors.email = 'That email address looks incomplete.';

  if (message.length < CONTACT_LIMITS.message.min)
    errors.message = `A few more words, please: at least ${CONTACT_LIMITS.message.min} characters.`;
  else if (message.length > CONTACT_LIMITS.message.max)
    errors.message = `Keep it under ${CONTACT_LIMITS.message.max} characters; we can talk about the rest.`;
  return errors;
}

/** True when the sender has used up the rate limit. */
export function isRateLimited(recentCount: number): boolean {
  return recentCount >= RATE_LIMIT.max;
}

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: 'invalid'; errors: ContactErrors }
  | { ok: false; reason: 'rate_limited'; retryAfterMinutes: number }
  | { ok: false; reason: 'server' };

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

/** The notification the owner receives for each message. */
export function contactEmail(input: Pick<ContactInput, 'name' | 'email' | 'message'>, studio: string) {
  const subject = `New message from ${input.name}`.slice(0, 200);
  const text = `${input.name} <${input.email}> wrote through the ${studio} contact form:\n\n${input.message}\n\nReply to this email to answer them.`;
  const html = `<p><strong>${escapeHtml(input.name)}</strong> &lt;${escapeHtml(input.email)}&gt; wrote through the ${escapeHtml(studio)} contact form:</p><blockquote style="margin:0;padding:12px 16px;border-left:3px solid #d4ff3a;white-space:pre-wrap">${escapeHtml(input.message)}</blockquote><p style="color:#666">Reply to this email to answer them.</p>`;
  return { subject, text, html };
}
