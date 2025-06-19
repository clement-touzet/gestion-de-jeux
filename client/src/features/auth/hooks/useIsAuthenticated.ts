import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const useIsAuthenticated = () => {
  // if return true mean that the user is authenticated, but the token might not be valid anymore
  // this is not a problem as the next request that required authentification will refresh the token
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log("refresh with persistant data");
      try {
        await refresh();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        console.error(err);
      }
    };

    if (!auth.accessToken) {
      verifyRefreshToken();
    } else {
      setIsAuthenticated(true);
    }
  }, [auth.accessToken, refresh]);

  return isAuthenticated;
};

export default useIsAuthenticated;
