import { AxiosInstance } from "axios";
import { AuthType } from "../providers/AuthProvider";

const disconnect = async (
  axiosPrivate: AxiosInstance,
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>
) => {
  await axiosPrivate("/api/auth/logout");
  setAuth({
    accessToken: "",
    userId: "",
  }); // reset auth object
};
export default disconnect;
