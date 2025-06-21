import express from "express";
const router = express.Router();
import getAccessTokenFromRequest from "../utils/getAccessTokenFromRequest";
import getUserIdFromAccessToken from "../utils/getUserFromAccessToken";
import db from "../db/db";
import {
  gameReviewInsertSchema,
  gameReviewTable,
} from "../db/schemas/game/gameReview";
import { and, eq } from "drizzle-orm";

router
  .route("/")
  .get(async (req, res) => {
    let accessToken;
    try {
      accessToken = getAccessTokenFromRequest(req);
    } catch (error) {
      res.status(401).json({
        message: "Vous devez être connecté pour ajouter un nouvel avis",
      });
      return;
    }
    const decodedUserId = getUserIdFromAccessToken(accessToken);
    if (!decodedUserId) {
      res.sendStatus(401);
      return;
    }
    const gamesReviews = await db.query.gameReviewTable.findMany({
      where: eq(gameReviewTable.userId, decodedUserId),
      with: {
        game: true,
      },
    });
    res.json(gamesReviews);
  })
  .post(async (req, res) => {
    let accessToken = "";
    try {
      accessToken = getAccessTokenFromRequest(req);
    } catch (error) {
      res.status(401).json({
        message: "Vous devez être connecté pour ajouter un nouvel avis",
      });
      return;
    }
    const decodedUserId = getUserIdFromAccessToken(accessToken);
    if (!decodedUserId) {
      res.sendStatus(500);
      return;
    }

    const gameReview = { ...req.body, userId: decodedUserId };
    console.log("gameReview", gameReview);

    const {
      data: parsedGameReview,
      success,
      error,
    } = gameReviewInsertSchema.safeParse(gameReview);
    if (!success) {
      console.log(error);
      res.status(400).json({ message: "Requête mal formatée" });
      return;
    }

    const duplicate = await db.query.gameReviewTable.findFirst({
      where: and(
        eq(gameReviewTable.userId, decodedUserId),
        eq(gameReviewTable.gameId, parsedGameReview.gameId)
      ),
    });
    // if a game review already exists for this game for this user, return 409 duplicate
    if (duplicate) {
      res
        .status(409)
        .json({ message: "Vous avez déjà écrit un avis pour ce jeu" });
      return;
    }

    try {
      console.log("inserted");
      const insertedGameReview = (
        await db.insert(gameReviewTable).values(parsedGameReview).returning()
      )[0];
      res.status(201).json(insertedGameReview);
    } catch (error) {
      res.status(500).json({ message: `Une erreur est survenue :${error}` });
    }
  });

router
  .route("/:id")
  .put((req, res) => {
    res.send("modifier une review");
  })
  .delete((req, res) => {
    res.send("supprimer une review");
  });

export default router;
