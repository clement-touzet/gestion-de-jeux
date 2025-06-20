import express from "express";
import db from "../db/db";
import { gameInsertSchema, gameTable } from "../db/schemas";
import { eq } from "drizzle-orm";

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

export default router;
