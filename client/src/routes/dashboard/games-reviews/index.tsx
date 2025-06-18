import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/games-reviews/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/game-reviews/"!</div>;
}
