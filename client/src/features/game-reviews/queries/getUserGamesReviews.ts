import { AxiosInstance } from "axios";
import { GameReviewFiltersType } from "../types/GameReviewFiltersType";
import { gamesReviewsWithGameSchema } from "../../../../../server/zod/game-review/GameReviewSchemas";

const GAMES_REVIEWS_API_URL = "/api/games-reviews";

const getUserGamesReviews = async (
  axiosPrivate: AxiosInstance,
  filters: GameReviewFiltersType
) => {
  const response = await axiosPrivate.get(GAMES_REVIEWS_API_URL, {
    method: "GET",
  });
  const data = await response.data;

  const {
    data: parsedGamesReview,
    success,
    error,
  } = gamesReviewsWithGameSchema.safeParse(data);

  if (!success) {
    console.log("errors ", error);
    throw new Error(
      "Une erreur est survenue lors de la récupération des données"
    );
  }

  let filteredGamesReview = parsedGamesReview;
  const searchFilter = filters.search;

  if (searchFilter) {
    filteredGamesReview = filteredGamesReview.filter((gameReview) => {
      return gameReview.game.name
        .toLowerCase()
        .includes(searchFilter.toLowerCase());
    });
  }

  return filteredGamesReview;
};

export default getUserGamesReviews;
