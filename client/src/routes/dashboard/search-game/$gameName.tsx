import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Section from "../../../features/ui/components/Section";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_GAMES } from "../../../constants/apiUrls";
import axios from "axios";
import { gamesSchema } from "../../../../../server/zod/GamesSchemas";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = { gameName: string };

export const Route = createFileRoute("/dashboard/search-game/$gameName")({
  component: RouteComponent,
});

const SearchGame = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm<Inputs>();

  const onSearch: SubmitHandler<Inputs> = async (data) => {
    await queryClient.invalidateQueries({
      queryKey: ["search-game"],
    });
    const gameName = data.gameName;
    reset();
    navigate({
      to: "/dashboard/search-game/$gameName",
      params: {
        gameName,
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSearch)} className="join">
      <input
        className="input rounded-l"
        placeholder="Rechercher un jeu..."
        {...register("gameName")}
      />
      <button type="submit" className="btn rounded-r">
        Rechercher
      </button>
    </form>
  );
};

function RouteComponent() {
  const { gameName } = Route.useParams();

  const { data: games } = useQuery({
    queryKey: ["search-game", gameName],
    queryFn: async () => {
      const result = await axios.get(GET_GAMES);
      const { data: parsedGames, success } = gamesSchema.safeParse(result.data);
      if (!success) return [];
      const filteredGames = parsedGames.filter((game) =>
        game.name.toLowerCase().includes(gameName.toLowerCase())
      );
      return filteredGames;
    },
  });

  console.log("", games);
  return (
    <div>
      <h1 className="font-bold text-2xl">Rechercher un jeu</h1>
      <SearchGame />
      <Section>
        <h2 className=" text-xl pb-8">
          Résultat de la recherche pour{" "}
          <span className="text-primary font-bold">{gameName}</span>
        </h2>
        <ul className="flex items-center gap-4">
          {games
            ? games.map((game) => (
                <li className="bg-base-300 p-4 rounded shadow-sm" key={game.id}>
                  {game.name}
                </li>
              ))
            : null}
        </ul>
      </Section>
    </div>
  );
}
