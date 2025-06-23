import { createFileRoute } from "@tanstack/react-router";
import Section from "../../../features/ui/components/Section";
import SearchGame from "../../../features/games/components/SearchGameInput";

export const Route = createFileRoute("/dashboard/browse/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Parcourir</h1>

      <Section>
        <SearchGame />
        <h2 className="text-xl font-bold py-4">Les plus populaires</h2>
      </Section>
      <Section>
        <h2 className="text-xl font-bold">Récemment ajouté</h2>
      </Section>
    </div>
  );
}
