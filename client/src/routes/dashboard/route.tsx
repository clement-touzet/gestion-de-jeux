import { createFileRoute } from "@tanstack/react-router";
import DashboardSidebar from "../../features/ui/layouts/dashboard-sidebar/DashboardSidebar";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <DashboardSidebar />
    </div>
  );
}
