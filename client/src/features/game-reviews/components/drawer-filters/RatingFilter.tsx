import Rating from "../../../ui/components/Rating";
import FilterCategory from "./FilterCategory";
import { GameReviewFiltersType } from "../../types/GameReviewFiltersType";

type Props = {
  rating: GameReviewFiltersType["stars"];
  onChange: (newRating: GameReviewFiltersType["stars"]) => void;
  isFilterByStarsActive: boolean;
  setIsFilterByStarsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const RatingFilter = ({
  rating,
  onChange,
  isFilterByStarsActive,
  setIsFilterByStarsActive,
}: Props) => {
  const handleChangeRating = (newRating: string) => {
    onChange(parseInt(newRating));
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
      </div>
    </div>
  );
};

export default RatingFilter;
