import { PropsWithChildren } from "react";
import { IconContext } from "react-icons/lib";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./features/auth/providers/AuthProvider";
type Props = PropsWithChildren;

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <IconContext.Provider value={{ size: "20" }}>
          {children}
        </IconContext.Provider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
