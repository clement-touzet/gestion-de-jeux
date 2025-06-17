import { Link } from "@tanstack/react-router";
import StartFreeLink from "../../components/StartFreeLink";

const HomeNavbarCTA = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
      <Link to="/" className="link">
        Se connecter
      </Link>
      <StartFreeLink />
    </div>
  );
};

export default HomeNavbarCTA;
