import jwt from "jsonwebtoken";
import env from "../../env";
import { UserType } from "../db/schemas";

const getRefreshJWT = (userId: UserType["id"]) => {
  return jwt.sign(userId, env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d", // expires 30d
  });
};

export default getRefreshJWT;
