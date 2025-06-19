import { AxiosInstance } from "axios";

const GAMES_REVIEWS_API_URL = "/api/games-reviews";

const getUserGamesReviews = async (axiosPrivate: AxiosInstance) => {
  const response = await axiosPrivate.get(GAMES_REVIEWS_API_URL, {
    method: "GET",
  });
  console.log("result fetch", response);
  console.log("data fetch", response.data);

  return response.data;
};

export default getUserGamesReviews;
