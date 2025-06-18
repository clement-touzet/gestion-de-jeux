import { createContext } from "react";

type AccessTokenType = {
  accessToken: string;
  setAccessToken: (newAccessToken: string) => void;
};

const AccessTokenContext = createContext<AccessTokenType | null>(null);

export default AccessTokenContext;
