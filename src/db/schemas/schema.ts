import {
  integer,
  pgTable,
  timestamp,
  varchar,
  boolean,
} from 'drizzle-orm/pg-core';

export const listItemTable = pgTable('listitem', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp('created_at').defaultNow(),
  updatedItem: varchar({ length: 255 }).notNull(),
  completed: boolean().default(false),
  reveal: boolean().default(false),
});
