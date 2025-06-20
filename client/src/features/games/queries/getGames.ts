import axios from "axios";
import { GET_GAMES } from "../../../constants/apiUrls";

const getGames = async () => {
  const response = await axios.get(GET_GAMES);
  const data = await response.data;

  return data;
};

export default getGames;
