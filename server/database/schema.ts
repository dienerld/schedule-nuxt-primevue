import { InferSelectModel } from 'drizzle-orm';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone'),
  apartment: integer('apartment').notNull(),
  password: text('password').notNull(),
});

export const machine = sqliteTable('machines', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  enabled: integer('enabled', { mode: 'boolean' }).notNull(),
});

export const schedule = sqliteTable('schedules', {
  id: integer('id').primaryKey(),
  machine: integer('machine_id').notNull(),
  day: integer('day', { mode: 'number' }).notNull(),
  shift: text('shift', { enum: ['morning', 'afternoon'] }).notNull(),
  userId: integer('user_id').notNull(),
  createdAt: integer('created_at').notNull().default(Date.now()),
  updatedAt: integer('updated_at').notNull().default(Date.now()),
});

export type User = InferSelectModel<typeof user>;
export type Schedule = InferSelectModel<typeof schedule>;
export type Machine = InferSelectModel<typeof machine>;
