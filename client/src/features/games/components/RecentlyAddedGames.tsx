import { useState } from "react";
import Pagination from "../../game-reviews/components/Pagination";
import GameCard from "./GameCard";
import { usePagination } from "../../../hooks/usePagination";
import { RECENTLY_ADDED_GAMES_URL } from "../../../constants/apiUrls";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const RecentlyAddedGames = () => {
  const [page, setPage] = useState(1);
  const { data: recentlyAddedGames } = useQuery({
    queryKey: ["recently-added-games"],
    queryFn: async () => (await axios.get(RECENTLY_ADDED_GAMES_URL)).data,
  });
  const paginationRecentlyAddedGames = usePagination(recentlyAddedGames, page);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 mb-8">
        {paginationRecentlyAddedGames
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            paginationRecentlyAddedGames.map((game: any) => {
              return (
                <GameCard
                  key={game.id}
                  gameName={game.name}
                  totalTimePlayed={game["total_time_played"]}
                  trendingPosition={game["popularity_position"]}
                />
              );
            })
          : null}
      </div>
      <div className="w-full flex justify-center">
        <Pagination
          elements={recentlyAddedGames}
          currentPage={page}
          changePage={setPage}
        />
      </div>
    </>
  );
};

export default RecentlyAddedGames;
