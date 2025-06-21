import { RiFilter3Line } from "react-icons/ri";
import { GameReviewFiltersType } from "../types/GameReviewFiltersType";
import Drawer from "react-modern-drawer";

import { useCallback, useState } from "react";
import RatingFilter from "./drawer-filters/RatingFilter";
import DateFilter from "./drawer-filters/DateFilter";
import TimePlayedFilter from "./drawer-filters/TimePlayedFilter";

type Props = {
  onChange: (filters: GameReviewFiltersType) => void;
};

const GameReviewListFilters = ({ onChange }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [rating, setRating] = useState<GameReviewFiltersType["stars"]>(0);
  const [isFilterByStarsActive, setIsFilterByStarsActive] = useState(false);

  const [dateRange, setDateRange] = useState<
    GameReviewFiltersType["dateRange"] | undefined
  >(undefined);
  const [isFilterByDateActive, setIsFilterByDateActive] = useState(false);

  const [timePlayed, setTimePlayed] = useState<
    GameReviewFiltersType["timePlayed"] | undefined
  >(undefined);
  const [isFilterByTimePlayedActive, setIsFilterByTimePlayedActive] =
    useState(false);

  const handleChangeRating = (newRating: GameReviewFiltersType["stars"]) => {
    setRating(newRating);
  };

  const handleChangeDateRange = (
    newDateRange: GameReviewFiltersType["dateRange"]
  ) => {
    setDateRange(newDateRange);
  };

  const handleChangeTimePlayed = useCallback(
    (newTimePlayed: GameReviewFiltersType["timePlayed"]) => {
      setTimePlayed(newTimePlayed);
    },
    []
  );

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleOpenDrawer = () => {
    openDrawer();
  };

  const handleCloseDrawer = () => {
    closeDrawer();
  };

  const handleSaveFilters = () => {
    const filters = {
      stars: isFilterByStarsActive ? rating : undefined,
      dateRange: isFilterByDateActive ? dateRange : undefined,
      timePlayed: isFilterByTimePlayedActive ? timePlayed : undefined,
    };
    onChange(filters);
  };

  return (
    <div>
      <button className="btn btn-wide" onClick={handleOpenDrawer}>
        <RiFilter3Line />
        Filtres
      </button>

      <Drawer
        open={isDrawerOpen}
        direction="right"
        onClose={handleCloseDrawer}
        className={
          "w-50! md:w-90! p-4 md:p-8 flex flex-col justify-between overflow-auto"
        }
        lockBackgroundScroll={true}
      >
        <div>
          <RatingFilter
            rating={rating}
            onChange={handleChangeRating}
            isFilterByStarsActive={isFilterByStarsActive}
            setIsFilterByStarsActive={setIsFilterByStarsActive}
          />

          <div className="divider"></div>
          <DateFilter
            dateRange={dateRange}
            onChange={handleChangeDateRange}
            isFilterByDateActive={isFilterByDateActive}
            setIsFilterByDateActive={setIsFilterByDateActive}
          />
          <div className="divider"></div>
          <TimePlayedFilter
            onChange={handleChangeTimePlayed}
            isFilterByTimePlayedActive={isFilterByTimePlayedActive}
            setIsFilterByTimePlayedActive={setIsFilterByTimePlayedActive}
          />
        </div>
        <div className="flex justify-center sticky bottom-0 left-0 w-full">
          <button
            className="btn btn-primary btn-wide"
            onClick={handleSaveFilters}
          >
            Enregistrer les filtres
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default GameReviewListFilters;
