import { useContext } from "react";
import AccessTokenContext from "../providers/access-token/AccessTokenContext";

const useAccessToken = () => {
  const accessToken = useContext(AccessTokenContext);
  if (accessToken === null) {
    throw new Error(
      "You must wrap the component with a AccessTokenProvider to use this hook"
    );
  }
  return accessToken;
};

export default useAccessToken;
