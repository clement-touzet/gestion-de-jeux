import express from "express";
import db from "../db/db";
import { userTable } from "../db/schemas";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

import env from "../../env";
import getRefreshJWT from "../utils/getRefreshJWT";
import getAccessJWT from "../utils/getAccessJWT";

const router = express.Router();

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
  const userFound = await db.query.userTable.findFirst({
    where: eq(email, userTable.email),
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
      .insert(userTable)
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
  const userFound = await db.query.userTable.findFirst({
    where: eq(email, userTable.email),
  });
  if (!userFound) {
    res.status(401).json({
      success: false,
      message: "You must register to be able to log in",
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
      .update(userTable)
      .set({ refreshToken })
      .where(eq(userTable.id, userFound.id));

    res.cookie("refreshJwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); // max age : 24h // http only so javascript can't access it on the frontend
    res.json({ success: true, accessToken }); // for the frontend, store that in memory (in state, not cookies or local storage)
  } else {
    res.status(401).json({ sucess: false, message: "Wrong password" });
  }
});

export default router;
