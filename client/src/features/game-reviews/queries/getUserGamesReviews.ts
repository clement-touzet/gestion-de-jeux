import { AxiosInstance } from "axios";
import { gamesReviewsWithGameSchema } from "../../../../../server/db/schemas/game/gameReview";

const GAMES_REVIEWS_API_URL = "/api/games-reviews";

const getUserGamesReviews = async (axiosPrivate: AxiosInstance) => {
  const response = await axiosPrivate.get(GAMES_REVIEWS_API_URL, {
    method: "GET",
  });
  const data = await response.data;

  const { data: parsedGamesReview, success } =
    gamesReviewsWithGameSchema.safeParse(data);

  if (!success)
    throw new Error(
      "Une erreur est survenue lors de la récupération des données"
    );

  return parsedGamesReview;
};

export default getUserGamesReviews;
