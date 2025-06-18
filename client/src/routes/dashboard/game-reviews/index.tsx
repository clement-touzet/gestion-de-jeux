import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/game-reviews/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/game-reviews/"!</div>;
}
