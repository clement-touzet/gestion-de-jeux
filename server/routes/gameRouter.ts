import express from "express";
import db from "../db/db";
import { gameInsertSchema, gameReviewTable, gameTable } from "../db/schemas";
import { desc, eq, sql, sum } from "drizzle-orm";

const router = express.Router();

router.get("/", async (req, res) => {
  const games = await db.query.gameTable.findMany();
  res.json(games);
});

router.post("/", async (req, res) => {
  const game = req.body;
  const { data: parsedGame, success } = gameInsertSchema.safeParse(game);
  if (!success) {
    res.status(400).json({ message: "Requête mal formatée" });
    return;
  }

  const foundGame = await db.query.gameTable.findFirst({
    where: eq(gameTable.name, parsedGame.name),
  });
  if (foundGame) {
    res.status(409).json({ message: "Ce jeu existe déjà" });
    return;
  }

  try {
    const insertedGame = (
      await db.insert(gameTable).values(game).returning()
    )[0];
    res.status(201).json(insertedGame);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/popular", async (req, res) => {
  // query to get all the popular games
  // the popularity depends of the cumulated played hours, all users included.
  const games = await db.execute(sql`
      SELECT
        ${gameTable.id},
        ${gameTable.name},
        SUM(game_review.time_played) as total_time_played,
        ROW_NUMBER() OVER (ORDER BY SUM(game_review.time_played) DESC) as popularity_position
      FROM
        ${gameTable}
        RIGHT JOIN ${gameReviewTable} ON ${gameTable.id} = ${gameReviewTable.gameId}
      GROUP BY
        ${gameTable.id}
      ORDER BY total_time_played DESC
    `);

  console.log("games", games);
  res.json(games);
});

router.get("/recently-added", async (req, res) => {
  // query to get all the recently added games. (games added less than a week)
  const games = await db.execute(sql`
      SELECT
        ${gameTable.id},
        ${gameTable.name},
        ${gameTable.createdAt}
      FROM
        ${gameTable}
      WHERE
        ${gameTable.createdAt} >= NOW() - INTERVAL '7 days'
      ORDER BY
        ${gameTable.createdAt} DESC
    `);

  console.log("games", games);
  res.json(games);
});

export default router;
