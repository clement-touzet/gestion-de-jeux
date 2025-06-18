import { PropsWithChildren } from "react";
import AccessTokenProvider from "./features/auth/providers/access-token/AccessTokenProvider";

type Props = PropsWithChildren;

const Providers = ({ children }: Props) => {
  return <AccessTokenProvider>{children}</AccessTokenProvider>;
};

export default Providers;
