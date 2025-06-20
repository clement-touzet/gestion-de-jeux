import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { gameReviewTable } from "./gameReview";

export const gameTable = pgTable("game", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
});

export const gameTableRelations = relations(gameTable, ({ many }) => ({
  reviews: many(gameReviewTable),
}));

export type GameType = typeof gameTable.$inferSelect;
export type InsertGameType = typeof gameTable.$inferInsert;

export const gameSelectSchema = createSelectSchema(gameTable);
export const gameInsertSchema = createInsertSchema(gameTable);
