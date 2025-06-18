import React, { useState } from "react";
import AccessTokenContext from "./AccessTokenContext";

const AccessTokenProvider = ({ children }: React.PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState("");

  return (
    <AccessTokenContext value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext>
  );
};

export default AccessTokenProvider;
