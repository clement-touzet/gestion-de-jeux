import { GameType } from "../../../server/db/schemas";

export const GET_GAMES = "/api/games";
export const POPULAR_GAMES_URL = "/api/games/popular";
export const POST_GAMES = "/api/games";

export const GET_GAMES_REVIEWS = "/api/games-reviews";
export const POST_GAMES_REVIEWS = "/api/games-reviews";

export const PUT_GAMES_REVIEWS_URL = (gameToUpdateId: GameType["id"]) =>
  `/api/games-reviews/${gameToUpdateId}`;
export const DELETE_GAME_REVIEW_URL = (gameToDeleteId: GameType["id"]) =>
  `/api/games-reviews/${gameToDeleteId}`;
