import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createSchemaFactory } from "drizzle-zod";
import { gameReviewTable } from "./gameReview";

export const gameTable = pgTable("game", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  createdAt: timestamp().notNull().defaultNow(),
});

export const gameTableRelations = relations(gameTable, ({ many }) => ({
  reviews: many(gameReviewTable),
}));

export type GameType = typeof gameTable.$inferSelect;
export type InsertGameType = typeof gameTable.$inferInsert;

const { createSelectSchema, createInsertSchema, createUpdateSchema } =
  createSchemaFactory({
    coerce: {
      date: true,
    },
  });

export const gameSelectSchema = createSelectSchema(gameTable);
export const gameInsertSchema = createInsertSchema(gameTable);
