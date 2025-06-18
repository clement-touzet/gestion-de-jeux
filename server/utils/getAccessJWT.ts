import jwt from "jsonwebtoken";
import env from "../../env";
import { UserType } from "../db/schemas";

const getAccessJWT = (userId: UserType["id"]) => {
  return jwt.sign(userId, env.ACCESS_TOKEN_SECRET, {
    expiresIn: 60 * 15, // expires in 15 minutes
  });
};

export default getAccessJWT;
