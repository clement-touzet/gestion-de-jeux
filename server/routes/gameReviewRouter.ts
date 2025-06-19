import express from "express";
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.json([]);
  })
  .post((req, res) => {
    res.send("post game review: l'utilisateur pourra créer une review ici");
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
