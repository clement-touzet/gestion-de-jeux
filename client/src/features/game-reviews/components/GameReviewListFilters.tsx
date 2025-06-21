import { RiFilter3Line } from "react-icons/ri";
import { GameReviewFiltersType } from "../types/GameReviewFiltersType";
import Drawer from "react-modern-drawer";

import { useState } from "react";
import RatingFilter from "./drawer-filters/RatingFilter";
import DateFilter from "./drawer-filters/DateFilter";
import TimePlayedFilter from "./drawer-filters/TimePlayedFilter";

type Props = {
  onChange: (filters: GameReviewFiltersType) => void;
};

const GameReviewListFilters = ({ onChange }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  return (
    <div>
      <button className="btn btn-wide" onClick={handleOpenDrawer}>
        <RiFilter3Line />
        Filters
      </button>

      <Drawer
        open={isDrawerOpen}
        direction="right"
        onClose={handleCloseDrawer}
        className={"w-50! md:w-90! p-4 md:p-8 "}
      >
        <RatingFilter />

        <div className="divider"></div>
        <DateFilter />
        <div className="divider"></div>
        <TimePlayedFilter />
      </Drawer>
    </div>
  );
};

export default GameReviewListFilters;
