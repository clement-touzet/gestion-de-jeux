import express from "express";
import db from "../db/db";
import { usersTable } from "../db/schemas";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import getRefreshJWT from "../utils/getRefreshJWT";
import getAccessJWT from "../utils/getAccessJWT";
import jwt from "jsonwebtoken";
import env from "../../env";

const router = express.Router();
const JWT_COOKIE_NAME = "jwt";

// REGISTER

router.post("/register", async (req, res) => {
  if (!req.body?.pseudonym || !req.body?.email || !req.body?.password) {
    res.status(400).send({
      success: false,
      message: "You must provide an email, a pseudonym and a password",
    });
    return;
  }

  const { pseudonym, email, password } = req.body;

  // verify the email isn't already taken
  const userFound = await db.query.usersTable.findFirst({
    where: eq(email, usersTable.email),
  });

  if (userFound) {
    res.status(409).send({
      success: false,
      message: "This email is already taken",
    }); // 409 = conflict
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const insertedUser = (
    await db
      .insert(usersTable)
      .values({
        email,
        pseudonym,
        hashedPassword,
      })
      .returning()
  )[0];

  const token = getRefreshJWT(insertedUser.id);
  res.status(201).send({
    success: true,
    message: "Inserted",
    insertedUserId: insertedUser.id,
    token,
  });
});

// LOGIN

router.post("/login", async (req, res) => {
  // check if email and password are provided
  if (!req.body?.email || !req.body?.password) {
    res.status(400).json({
      sucess: false,
      message: "You must provide an email and a password",
    });
    return;
  }

  // check if user is registered
  const { email, password } = req.body;
  const userFound = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });
  if (!userFound) {
    res.status(401).json({
      success: false,
      message: "Aucun compte trouvé pour cette adresse email.",
    }); // unauthorized
    return;
  }

  // check if the password match the saved hashed password (in db)
  const match = await bcrypt.compare(password, userFound?.hashedPassword);
  if (match) {
    // get Json Web Tokens
    const refreshToken = getRefreshJWT(userFound.id);
    const accessToken = getAccessJWT(userFound.id);

    // save refresh token in db
    await db
      .update(usersTable)
      .set({ refreshToken })
      .where(eq(usersTable.id, userFound.id));

    res.cookie(JWT_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); // max age : 24h // http only so javascript can't access it on the frontend
    res.json({ success: true, accessToken }); // for the frontend, store that in memory (in state, not cookies or local storage)
  } else {
    res.status(401).json({ sucess: false, message: "Mot de passe incorrect" });
  }
});

// LOGOUT

router.get("/logout", async (req, res) => {
  // on client, also delete the access token !

  // get  refresh token from cookies
  const refreshToken = req.cookies?.[JWT_COOKIE_NAME];
  if (!refreshToken) {
    res.sendStatus(204); // no content
    return;
  }

  if (typeof refreshToken !== "string") {
    res.sendStatus(400); // the token must be a string
    return;
  }

  // find user from refresh token
  const userFound = await db.query.usersTable.findFirst({
    where: eq(usersTable.refreshToken, refreshToken),
  });
  if (!userFound) {
    res.clearCookie(JWT_COOKIE_NAME, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.sendStatus(204);
    return;
  }

  // delete the refresh token
  await db
    .update(usersTable)
    .set({ refreshToken: "" })
    .where(eq(usersTable.id, userFound.id));

  res.clearCookie(JWT_COOKIE_NAME, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  }); // secure :true - only serves on https when in production
  res.sendStatus(204);
});

// REFRESH TOKEN

router.get("/refresh", async (req, res) => {
  console.log("refresh", req.cookies);
  const refreshToken = req.cookies?.[JWT_COOKIE_NAME];
  if (!refreshToken) {
    res.sendStatus(401);
    return;
  }

  // get refresh token from cookies
  if (typeof refreshToken !== "string") {
    res.sendStatus(400); // the token must be a string
    return;
  }

  // find user from refresh token
  const userFound = await db.query.usersTable.findFirst({
    where: eq(usersTable.refreshToken, refreshToken),
  });
  if (!userFound) {
    res.sendStatus(403); // forbidden
    return;
  }

  // verify the refresh token is still valid, and if so, refresh the access token
  jwt.verify(
    refreshToken,
    env.REFRESH_TOKEN_SECRET,
    (err, decodedUser: any) => {
      if (err || userFound.id !== decodedUser.userId) {
        res.sendStatus(403);
        return;
      }
      const accessToken = getAccessJWT(decodedUser.userId);
      res.json({ accessToken });
    }
  );
});

export default router;
