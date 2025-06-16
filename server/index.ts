import express from "express";
import gameReviewRouter from "./routes/gameReviewRouter";
import gameRouter from "./routes/gameRouter";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/games", gameRouter);
app.use("/api/game-reviews", gameReviewRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
