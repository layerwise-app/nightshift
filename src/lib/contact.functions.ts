import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { env } from 'cloudflare:workers';
import { and, count, eq, gt } from 'drizzle-orm';
import { db } from '~/db';
import { contactMessages } from '~/db/schema';
import {
  cleanContactInput,
  contactEmail,
  isRateLimited,
  RATE_LIMIT,
  validateContact,
  type ContactInput,
  type ContactResult
} from '~/lib/contact';
import { portfolio } from '~/portfolio.config';

async function senderHash(): Promise<string> {
  const ip =
    getRequestHeader('cf-connecting-ip') ??
    getRequestHeader('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';
  const agent = getRequestHeader('user-agent') ?? '';
  const data = new TextEncoder().encode(`nightshift-contact:${ip}:${agent.slice(0, 120)}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Saves a contact form message and, when `ownerEmail` is set in
 * `portfolio.config.ts`, emails it to the owner. Validated here, whatever the
 * browser checked; limited to a few messages per sender per quarter hour.
 */
export const sendContactMessage = createServerFn({ method: 'POST' })
  .validator((raw: unknown): ContactInput => cleanContactInput(raw))
  .handler(async ({ data }): Promise<ContactResult> => {
    // Bots fill the hidden field. Pretend it worked and keep nothing.
    if (data.website) return { ok: true };

    const errors = validateContact(data);
    if (Object.keys(errors).length > 0) return { ok: false, reason: 'invalid', errors };

    try {
      const hash = await senderHash();
      const since = new Date(Date.now() - RATE_LIMIT.windowMinutes * 60_000);
      const [recent] = await db
        .select({ value: count() })
        .from(contactMessages)
        .where(and(eq(contactMessages.senderHash, hash), gt(contactMessages.createdAt, since)));
      if (isRateLimited(recent?.value ?? 0)) {
        return { ok: false, reason: 'rate_limited', retryAfterMinutes: RATE_LIMIT.windowMinutes };
      }

      const [saved] = await db
        .insert(contactMessages)
        .values({ name: data.name, email: data.email, message: data.message, senderHash: hash })
        .returning({ id: contactMessages.id });

      if (portfolio.ownerEmail) {
        const mail = contactEmail(data, portfolio.name);
        const { error } = await env.EMAIL.send({
          to: portfolio.ownerEmail,
          replyTo: data.email,
          subject: mail.subject,
          text: mail.text,
          html: mail.html
        });
        const status = error ? error.code : 'sent';
        if (error) console.warn(`[contact] email for ${saved.id}: ${error.code} ${error.message}`);
        await db.update(contactMessages).set({ emailStatus: status }).where(eq(contactMessages.id, saved.id));
      }
      return { ok: true };
    } catch (error) {
      console.error('[contact] could not save message', error);
      return { ok: false, reason: 'server' };
    }
  });
