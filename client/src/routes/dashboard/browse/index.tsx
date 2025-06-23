import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/browse/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>parcourir</div>;
}
