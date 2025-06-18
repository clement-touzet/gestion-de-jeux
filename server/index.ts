import express from "express";
import gameReviewRouter from "./routes/gameReviewRouter";
import gameRouter from "./routes/gameRouter";
import authRouter from "./routes/authRouter";
import verifyJWT from "./middlewares/verifyJWT";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware for cookies
app.use(cookieParser());

// not protected routes
app.use("/api/games", gameRouter);
app.use("/api/auth", authRouter);

// all the routes below are protected
app.use(verifyJWT);
app.use("/api/games-reviews", gameReviewRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
