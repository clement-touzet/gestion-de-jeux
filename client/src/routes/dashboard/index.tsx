import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Temps total joué</div>
          <div className="stat-value">4000h</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Moyenne des notes</div>
          <div className="stat-value">4,3 étoiles</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Nombre total de jeux</div>
          <div className="stat-value">13</div>
        </div>
      </div>
    </div>
  );
}
