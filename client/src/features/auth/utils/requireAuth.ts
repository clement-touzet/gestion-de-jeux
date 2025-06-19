import { ParsedLocation, redirect } from "@tanstack/react-router";
import { AuthType } from "../providers/AuthProvider";

const requireAuth = (
  accessToken: AuthType["accessToken"],
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  location: ParsedLocation<{}>
) => {
  if (!accessToken) {
    throw redirect({
      to: "/login",
      search: {
        redirect: location.href,
      },
    });
  }
};

export default requireAuth;
