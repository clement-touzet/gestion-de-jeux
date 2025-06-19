import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthContextType } from "../features/auth/providers/AuthProvider";

interface MyRouterContext {
  authentication: AuthContextType;
}

// the WithContext allow to use a context in beforeLoad function from createFileRoute
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
