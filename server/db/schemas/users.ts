import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  pseudonym: varchar("pseudonym", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
  refreshToken: varchar("refresh_token", { length: 255 }),
});

export type UserType = typeof usersTable.$inferSelect;
export type InsertUserType = typeof usersTable.$inferInsert;
