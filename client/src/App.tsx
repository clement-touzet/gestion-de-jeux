import React from "react";
import { AuthProvider } from "./features/auth/providers/AuthProvider";
import Providers from "./Providers";
import useAuth from "./features/auth/hooks/useAuth";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
  // defining context to create protected routes
  context: {
    authentication: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
});

function InnerApp() {
  const authentication = useAuth();
  return <RouterProvider router={router} context={{ authentication }} />;
}

const App = () => {
  return (
    <AuthProvider>
      <Providers>
        <InnerApp />
      </Providers>
    </AuthProvider>
  );
};

export default App;
