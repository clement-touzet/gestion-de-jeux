import jwt from "jsonwebtoken";
import env from "../../env";

const getUserIdFromAccessToken = (accessToken: string): string | undefined => {
  try {
    const { userId } = <jwt.UserIdJwtPayload>(
      jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET)
    );
    return userId;
  } catch {
    return undefined;
  }
};

export default getUserIdFromAccessToken;
