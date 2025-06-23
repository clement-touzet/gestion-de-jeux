import { AxiosInstance } from "axios";
import { GameReviewFiltersType } from "../types/GameReviewFiltersType";
import {
  GameReviewWithGameType,
  gamesReviewsWithGameSchema,
} from "../../../../../server/zod/game-review/GameReviewSchemas";

const GAMES_REVIEWS_API_URL = "/api/games-reviews";

const getUserGamesReviews = async (
  axiosPrivate: AxiosInstance,
  filters: GameReviewFiltersType
): Promise<GameReviewWithGameType[]> => {
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
  console.log("filters", filters);
  const searchFilter = filters.search;
  const rangeDateFilter = filters.dateRange;
  const starsFilter = filters.stars;
  const timePlayedFilter = filters.timePlayed;

  if (searchFilter) {
    filteredGamesReview = filteredGamesReview.filter((gameReview) => {
      return gameReview.game.name
        .toLowerCase()
        .includes(searchFilter.toLowerCase());
    });
  }

  if (starsFilter) {
    filteredGamesReview = filteredGamesReview.filter((gameReview) => {
      return gameReview.stars === starsFilter;
    });
  }

  if (rangeDateFilter) {
    filteredGamesReview = filteredGamesReview.filter((gameReview) => {
      if (rangeDateFilter.from && rangeDateFilter.to)
        return (
          gameReview.createdAt >= rangeDateFilter.from &&
          gameReview.createdAt <= rangeDateFilter.to
        );
      return false;
    });
  }

  if (timePlayedFilter) {
    filteredGamesReview = filteredGamesReview.filter((gameReview) => {
      // return true if timeplayed is in the range of the filter
      return (
        gameReview.timePlayed >= timePlayedFilter.min &&
        gameReview.timePlayed <= timePlayedFilter.max
      );
    });
  }

  return filteredGamesReview;
};

export default getUserGamesReviews;
