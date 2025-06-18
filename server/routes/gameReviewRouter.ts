import express from "express";
import verifyJWT from "../middlewares/verifyJWT";
const router = express.Router();

router
  .route("/")
  .get(verifyJWT, (req, res) => {
    res.send("voici la liste des review de jeux ");
  })
  .post(verifyJWT, (req, res) => {
    res.send("post game review: l'utilisateur pourra créer une review ici");
  });

router
  .route("/:id")
  .put(verifyJWT, (req, res) => {
    res.send("modifier une review");
  })
  .delete(verifyJWT, (req, res) => {
    res.send("supprimer une review");
  });

export default router;
