import { createFileRoute } from "@tanstack/react-router";
import Section from "../../../features/ui/components/Section";
import ReviewCardsSection from "../../../features/game-reviews/components/ReviewCardsSection";
import ReviewCard from "../../../features/game-reviews/components/ReviewCard";
import { useQuery } from "@tanstack/react-query";
import getUserGamesReviews from "../../../features/game-reviews/queries/getUserGamesReviews";

import useAxiosPrivate from "../../../features/auth/hooks/useAxiosPrivate";
import AddNewGameReview from "../../../features/game-reviews/components/AddNewGameReview";
import { GAMES_REVIEWS_QUERY_KEY } from "../../../constants/queryKeys";
import GameReviewListFilters from "../../../features/game-reviews/components/GameReviewListFilters";
import { useState } from "react";
import { GameReviewFiltersType } from "../../../features/game-reviews/types/GameReviewFiltersType";
import SearchInput from "../../../features/ui/components/SearchInput";

export const Route = createFileRoute("/dashboard/games-reviews/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] =
    useState<Omit<GameReviewFiltersType, "search">>();

  const axiosPrivate = useAxiosPrivate();

  const {
    data: gamesReviews,
    error,
    isError,
  } = useQuery({
    queryKey: [GAMES_REVIEWS_QUERY_KEY, { search }],
    queryFn: () => getUserGamesReviews(axiosPrivate, { search }),
  });

  const handleChangeFilters = (
    filters: Omit<GameReviewFiltersType, "search">
  ) => {};

  const handleChangeSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="font-bold text-2xl">Mes jeux</h1>

      <Section>
        <div className="flex justify-between gap-2 flex-wrap">
          <SearchInput onChange={handleChangeSearch} />
          <div className="grid gap-2 grid-cols-2">
            <GameReviewListFilters onChange={handleChangeFilters} />
            <AddNewGameReview />
          </div>
        </div>

        <ReviewCardsSection error={error} isError={isError}>
          {gamesReviews
            ? gamesReviews.map(({ timePlayed, stars, game: { name, id } }) => {
                return (
                  <ReviewCard
                    key={id}
                    timePlayed={timePlayed}
                    stars={stars}
                    gameName={name}
                  />
                );
              })
            : null}
        </ReviewCardsSection>
      </Section>
    </div>
  );
}
