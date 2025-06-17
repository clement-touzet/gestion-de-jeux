import { createFileRoute } from "@tanstack/react-router";
import HomeNavbar from "../features/ui/layouts/home-navbar/HomeNavbar";
import StartFreeLink from "../features/ui/components/StartFreeLink";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <HomeNavbar />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">SatiGames</h1>
            <p className="py-6">
              Sauvegarde tes statistiques de jeux facilement et gratuitement
            </p>
            <StartFreeLink className="btn-lg btn-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
