import { AxiosError, AxiosInstance } from "axios";
import { InsertGameReviewType } from "../../../../../server/db/schemas/game/gameReview";
import { POST_GAMES_REVIEWS } from "../../../constants/apiUrls";

const addGameReview = async (
  gameReview: Omit<InsertGameReviewType, "userId">,
  axiosPrivate: AxiosInstance
) => {
  try {
    const result = await axiosPrivate(POST_GAMES_REVIEWS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: gameReview,
    });
    if (result.status !== 201) {
      const errorMessage = result.data.message;
      throw new Error(
        errorMessage || "Une erreur est survenue, veillez réessayer plus tard"
      );
    }
    console.log("result", result);
    const insertedGameReview = result.data;
    return insertedGameReview;
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

export default addGameReview;
