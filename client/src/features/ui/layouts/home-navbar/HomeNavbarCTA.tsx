import { Link } from "@tanstack/react-router";

const HomeNavbarCTA = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
      <Link to="/" className="link">
        Se connecter
      </Link>
      <Link to="/" className="btn">
        Démarrer gratuitement
      </Link>
    </div>
  );
};

export default HomeNavbarCTA;
