import { createContext, useState } from "react";

export type AuthType = {
  accessToken: string;
  userId: string;
};
export type AuthContextType = {
  auth: AuthType;
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [auth, setAuth] = useState({
    accessToken: "",
    userId: "",
  });

  return <AuthContext value={{ auth, setAuth }}>{children}</AuthContext>;
};

export default AuthContext;
