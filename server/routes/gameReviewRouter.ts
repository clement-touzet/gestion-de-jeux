import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("voici la liste des review de jeux ");
});

export default router;
