import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const todosTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  todo: text().notNull(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().$onUpdate(() => new Date()),
});
