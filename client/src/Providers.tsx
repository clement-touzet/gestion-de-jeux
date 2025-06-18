import { PropsWithChildren } from "react";
import AccessTokenProvider from "./features/auth/providers/access-token/AccessTokenProvider";
import { IconContext } from "react-icons/lib";

type Props = PropsWithChildren;

const Providers = ({ children }: Props) => {
  return (
    <AccessTokenProvider>
      <IconContext.Provider value={{ size: "20" }}>
        {children}
      </IconContext.Provider>
    </AccessTokenProvider>
  );
};

export default Providers;
