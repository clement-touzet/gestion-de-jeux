import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { POPULAR_GAMES_URL } from "../../../constants/apiUrls";
import GameCard from "./GameCard";
import Pagination from "../../game-reviews/components/Pagination";
import { useState } from "react";
import { usePagination } from "../../../hooks/usePagination";

const PopularGames = () => {
  const [page, setPage] = useState(1);
  const { data: popularGames } = useQuery({
    queryKey: ["popular-games"],
    queryFn: async () => (await axios.get(POPULAR_GAMES_URL)).data,
  });
  const paginationPopularGames = usePagination(popularGames, page);

  console.log("popular games ", popularGames);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 mb-8">
        {paginationPopularGames
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            paginationPopularGames.map((game: any) => {
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
          elements={popularGames}
          currentPage={page}
          changePage={setPage}
        />
      </div>
    </>
  );
};

export default PopularGames;
