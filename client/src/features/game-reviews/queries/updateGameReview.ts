import { AxiosError, AxiosInstance } from "axios";
import {
  GameReviewUpdateType,
  GameType,
} from "../../../../../server/db/schemas";
import { PUT_GAMES_REVIEWS_URL } from "../../../constants/apiUrls";

const updateGameReview = async (
  gameId: GameType["id"],
  data: GameReviewUpdateType,
  axiosPrivate: AxiosInstance
) => {
  try {
    const result = await axiosPrivate(PUT_GAMES_REVIEWS_URL(gameId), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    });
    if (result.status !== 200) {
      const errorMessage = result.data.message;
      throw new Error(
        errorMessage || "Une erreur est survenue, veillez réessayer plus tard"
      );
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data.message) {
      throw new Error(error.response.data.message);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      console.error("Erreur inconnue :", error);
      throw new Error("Erreur inconnue");
    }
  }
};
export default updateGameReview;
