import { relations, sql } from "drizzle-orm";
import { check, integer, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { gameTable } from "./game";
import { usersTable } from "../users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const gameReviewTable = pgTable(
  "game_review",
  {
    gameId: uuid("game_id")
      .notNull()
      .references(() => gameTable.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id),
    timePlayed: integer("time_played").notNull(),
    stars: integer("stars").notNull(),
  },
  (table) => [
    check("time_played_check", sql`${table.timePlayed} >= 0`),
    check("stars_check", sql`${table.stars} > 0 AND ${table.stars} < 6`),
    primaryKey({ columns: [table.gameId, table.userId] }),
  ]
);

export const gameReviewTableRelations = relations(
  gameReviewTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [gameReviewTable.userId],
      references: [usersTable.id],
    }),
    game: one(gameTable, {
      fields: [gameReviewTable.gameId],
      references: [gameTable.id],
    }),
  })
);

export type GameReviewType = typeof gameReviewTable.$inferSelect;
export type InsertGameReviewType = typeof gameReviewTable.$inferInsert;

export const gameReviewSelectSchema = createSelectSchema(gameReviewTable);
export const gameReviewInsertSchema = createInsertSchema(gameReviewTable);
