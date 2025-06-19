import { NextFunction, Request, Response } from "express";
import env from "../../env";
import jwt from "jsonwebtoken";

// middleware to protect api routes. It verify the jwt access token in authorization headers are valid
const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }
  console.log("authHeader", authHeader);
  const token = authHeader.split(" ")[1]; //because authHeader should be "Bearer [token]"

  if (!token) {
    res.status(400).send({
      sucess: false,
      message: "No token found in authorization header",
    });
    return;
  }

  jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decodedUser: any) => {
    if (err) {
      console.log("error: jwt cannont be validated", token);
      res.sendStatus(403);
      return;
    }
    (req as any).userId = decodedUser.userId;
    next();
  });
};

export default verifyJWT;
