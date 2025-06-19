import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Outlet, useNavigate } from "@tanstack/react-router";

const ProtectedRoute = () => {
  // a protected route means that the user must be connected before he can load the route.
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log("refresh with persistant data");
      try {
        await refresh();
      } catch (err) {
        console.error(err);
        navigate({
          to: "/login",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth.accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [auth.accessToken, refresh]);

  return <>{isLoading ? <p>Loading </p> : <Outlet />}</>;
};

export default ProtectedRoute;
