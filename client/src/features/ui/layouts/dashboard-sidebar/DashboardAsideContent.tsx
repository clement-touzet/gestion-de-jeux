import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  RiHomeLine,
  RiBookShelfLine,
  RiCompassDiscoverLine,
} from "react-icons/ri";
import useAxiosPrivate from "../../../auth/hooks/useAxiosPrivate";
import useIsAuthenticated from "../../../auth/hooks/useIsAuthenticated";
import useAuth from "../../../auth/hooks/useAuth";
import disconnect from "../../../auth/queries/disconnect";

const DashboardAsideContent = ({
  handleCloseDrawer,
}: {
  handleCloseDrawer?: () => void;
}) => {
  const isAuthenticated = useIsAuthenticated();
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();

  const { refetch } = useQuery({
    queryKey: ["logout"],
    queryFn: () => disconnect(axiosPrivate, setAuth),
    enabled: false,
  });

  const onDisconnect = () => {
    refetch();
  };

  return (
    <div className="flex flex-col h-full justify-between">
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
      {isAuthenticated ? (
        <div className="pb-8">
          <button
            className="btn btn-soft btn-primary btn-wide"
            onClick={onDisconnect}
          >
            Se déconnecter
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardAsideContent;
