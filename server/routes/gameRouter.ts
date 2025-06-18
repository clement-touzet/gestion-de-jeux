import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("voici la liste des jeux ");
});

router.post("/", (req, res) => {
  res.send("POSTTTTT ");
});

export default router;
