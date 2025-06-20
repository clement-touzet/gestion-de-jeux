import { AxiosInstance } from "axios";

const GAMES_REVIEWS_API_URL = "/api/games-reviews";

const getUserGamesReviews = async (axiosPrivate: AxiosInstance) => {
  const response = await axiosPrivate.get(GAMES_REVIEWS_API_URL, {
    method: "GET",
  });
  const data = await response.data;
  console.log("result fetch", response);
  console.log("data fetch", response.data);

  return data;
};

export default getUserGamesReviews;
