import { Link } from "@tanstack/react-router";
import {
  RiHomeLine,
  RiBookShelfLine,
  RiCompassDiscoverLine,
} from "react-icons/ri";

const DashboardAsideContent = ({
  handleCloseDrawer,
}: {
  handleCloseDrawer?: () => void;
}) => {
  return (
    <ul className="space-y-2 font-medium">
      <li className="">
        <Link
          to="/dashboard"
          className="btn btn-ghost btn-wide"
          onClick={handleCloseDrawer}
        >
          <RiHomeLine />
          Accueil
        </Link>
      </li>
      <li className="">
        <Link
          to="/dashboard/games-reviews"
          onClick={handleCloseDrawer}
          className="btn btn-ghost btn-wide"
        >
          <RiBookShelfLine />
          Mes jeux
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/browse"
          className="btn btn-ghost btn-wide"
          onClick={handleCloseDrawer}
        >
          <RiCompassDiscoverLine />
          Parcourir
        </Link>
      </li>
    </ul>
  );
};

export default DashboardAsideContent;
