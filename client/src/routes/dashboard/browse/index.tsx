import { createFileRoute } from "@tanstack/react-router";
import Section from "../../../features/ui/components/Section";
import SearchGame from "../../../features/games/components/SearchGameInput";
import PopularGames from "../../../features/games/components/PopularGames";
import RecentlyAddedGames from "../../../features/games/components/RecentlyAddedGames";

export const Route = createFileRoute("/dashboard/browse/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Parcourir</h1>

      <Section>
        <SearchGame />

        <div className="py-4">
          <h2 className="text-xl font-bold ">Les plus populaires</h2>
          <p className="text-neutral-500">Les plus joués</p>
        </div>
        <PopularGames />
      </Section>
      <Section>
        <div className="py-4">
          <h2 className="text-xl font-bold">Les p'tits nouveaux</h2>
          <p className="text-neutral-500">
            Jeux ajoutés il y a moins d'une semaine
          </p>
        </div>
        <RecentlyAddedGames />
      </Section>
    </div>
  );
}
