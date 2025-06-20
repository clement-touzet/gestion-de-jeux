import { AxiosInstance } from "axios";
import { InsertGameReviewType } from "../../../../../server/db/schemas/game/gameReview";
import { POST_GAMES_REVIEWS } from "../../../constants/apiUrls";

const addGameReview = async (
  gameReview: Omit<InsertGameReviewType, "userId">,
  axiosPrivate: AxiosInstance
) => {
  const result = await axiosPrivate(POST_GAMES_REVIEWS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: gameReview,
  });
  console.log("result", result);
  if (result.status !== 201) {
    const errorMessage = result.data.message;
    throw new Error(
      errorMessage || "Une erreur est survenue, veillez réessayer plus tard"
    );
  }
  const insertedGameReview = result.data;
  return insertedGameReview;
};

export default addGameReview;
