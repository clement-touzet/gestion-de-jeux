import z from "zod/v4";
import { gameReviewSelectSchema, gameSelectSchema } from "../../db/schemas";
import { GAME_RELATION_NAME } from "../../db/relationsNames";

export const gameReviewWithGameSchema = gameReviewSelectSchema.extend({
  [GAME_RELATION_NAME]: gameSelectSchema,
});
export const gamesReviewsWithGameSchema = z.array(gameReviewWithGameSchema);

export type GameReviewWithGameType = z.infer<typeof gameReviewWithGameSchema>;
