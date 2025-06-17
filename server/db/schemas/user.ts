import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  pseudonym: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  hashedPassword: varchar({ length: 255 }).notNull(),
});

export type UserType = typeof userTable.$inferSelect;
export type InsertUserType = typeof userTable.$inferInsert;
