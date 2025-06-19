import { ParsedLocation, redirect } from "@tanstack/react-router";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const requireAuth = (userId: string, location: ParsedLocation<{}>) => {
  if (!userId) {
    throw redirect({
      to: "/login",
      search: {
        redirect: location.href,
      },
    });
  }
};

export default requireAuth;
