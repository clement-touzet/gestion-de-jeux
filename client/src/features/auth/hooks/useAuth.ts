import { useContext } from "react";
import AuthContext from "../providers/AuthProvider";

const useAuth = () => {
  const accessToken = useContext(AuthContext);
  if (accessToken === null) {
    throw new Error(
      "You must wrap the component with a AccessTokenProvider to use this hook"
    );
  }
  return accessToken;
};

export default useAuth;
