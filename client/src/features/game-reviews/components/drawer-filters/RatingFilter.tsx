import { useState } from "react";
import Rating from "../../../ui/components/Rating";
import FilterCategory from "./FilterCategory";

const RatingFilter = () => {
  const [isFilterByStarsActive, setIsFilterByStarsActive] = useState(false);
  const [rating, setRating] = useState<number>(0);

  const handleChangeRating = (newRating: string) => {
    setRating(parseInt(newRating));
  };

  const handleResetRating = () => {
    setRating(0);
  };

  const handleClickToggleFilter = () => {
    setIsFilterByStarsActive((prev) => !prev);
  };
  return (
    <div className="">
      <FilterCategory
        title="Filtrer par note"
        isFilterActive={isFilterByStarsActive}
        handleClickCheckbox={handleClickToggleFilter}
      />
      <div className="grid gap-2 items-center">
        <Rating
          value={rating}
          handleChangeValue={handleChangeRating}
          disabled={!isFilterByStarsActive}
        />
        <button
          onClick={handleResetRating}
          className="btn"
          disabled={rating === 0 || !isFilterByStarsActive}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default RatingFilter;
