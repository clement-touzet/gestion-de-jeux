import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await fetch("/api/auth/refresh", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log("data from refresh", data);
    setAuth((prev) => {
      console.log("prev data", prev);
      return {
        ...prev,
        accessToken: data.accessToken,
      };
    });
    return data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
