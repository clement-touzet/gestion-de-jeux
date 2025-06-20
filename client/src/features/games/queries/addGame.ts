import { InsertGameType } from "../../../../../server/db/schemas/game/game";
import { POST_GAMES } from "../../../constants/apiUrls";

const addGame = async (game: InsertGameType) => {
  const result = await fetch(POST_GAMES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });
  if (!result.ok) {
    const errorMessage = (await result.json()).message;
    throw new Error(
      errorMessage || "Une erreur est survenue, veillez réessayer plus tard"
    );
  }
  const insertedGame = await result.json();
  return insertedGame;
};

export default addGame;
