import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const gameTable = pgTable("game", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
});
