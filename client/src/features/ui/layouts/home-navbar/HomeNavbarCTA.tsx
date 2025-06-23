import { Link } from "@tanstack/react-router";
import StartFreeLink from "../../components/StartFreeLink";
import useIsAuthenticated from "../../../auth/hooks/useIsAuthenticated";

const HomeNavbarCTA = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
      {isAuthenticated ? (
        <>
          <Link className="btn btn-primary btn-soft" to="/dashboard">
            Accéder au dashboard
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="link">
            Se connecter
          </Link>
          <StartFreeLink />
        </>
      )}
    </div>
  );
};

export default HomeNavbarCTA;
