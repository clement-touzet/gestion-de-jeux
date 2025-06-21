import { AxiosError, AxiosInstance } from "axios";
import { GameReviewType } from "../../../../../server/db/schemas/game/gameReview";
import { DELETE_GAME_REVIEW_URL } from "../../../constants/apiUrls";

const deleteGameReview = async (
  gameId: GameReviewType["gameId"],
  axiosPrivate: AxiosInstance
) => {
  console.log("delete tan stack");
  try {
    const result = await axiosPrivate(DELETE_GAME_REVIEW_URL(gameId), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ gameId }),
    });
    if (result.status !== 204) {
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

export default deleteGameReview;
