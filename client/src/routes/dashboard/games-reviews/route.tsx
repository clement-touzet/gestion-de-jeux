import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoute from "../../../features/auth/components/ProtectedRoute";

export const Route = createFileRoute("/dashboard/games-reviews")({
  component: RouteComponent,
});

function RouteComponent() {
  // this route is protected
  return (
    <div>
      <ProtectedRoute />
    </div>
  );
}
