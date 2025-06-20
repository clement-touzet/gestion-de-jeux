import { Request } from "express";

const getAccessTokenFromRequest = (req: Request) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    throw new Error("no authorization headers");
  }
  const accessToken = authHeader.split(" ")[1];
  return accessToken;
};
export default getAccessTokenFromRequest;
