import { createFileRoute } from "@tanstack/react-router";
import HomeNavbar from "../features/ui/layouts/home-navbar/HomeNavbar";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <HomeNavbar />
    </div>
  );
}
