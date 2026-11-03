import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

// App tables. After changing this file run `pnpm run db:generate --name <change>`
// and `pnpm run db:migrate`. Migrations are applied to the production D1
// database when the site is published.

/** Every message sent through the contact form on /contact. */
export const contactMessages = sqliteTable(
  'contact_messages',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    email: text('email').notNull(),
    message: text('message').notNull(),
    /** SHA-256 of the sender's IP and a salt; used only for the rate limit. */
    senderHash: text('sender_hash').notNull(),
    /** `sent`, `skipped` (no ownerEmail set) or an Layerwise Email error code. */
    emailStatus: text('email_status').notNull().default('skipped'),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date())
  },
  (table) => [
    index('contact_messages_sender_created_idx').on(
      table.senderHash,
      table.createdAt
    )
  ]
);
