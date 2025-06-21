import FilterCategory from "./FilterCategory";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { GameReviewFiltersType } from "../../types/GameReviewFiltersType";

type Props = {
  dateRange: GameReviewFiltersType["dateRange"];
  onChange: (newDateRange: GameReviewFiltersType["dateRange"]) => void;
  isFilterByDateActive: boolean;
  setIsFilterByDateActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const DateFilter = ({
  dateRange,
  onChange,
  isFilterByDateActive,
  setIsFilterByDateActive,
}: Props) => {
  const defaultClassNames = getDefaultClassNames();
  const handleClickToggleFilter = () => {
    setIsFilterByDateActive((prev) => !prev);
  };

  const handleResetDateRange = () => {
    onChange(undefined);
  };

  return (
    <div>
      <div className="pb-4">
        <FilterCategory
          title="Filtrer par date"
          isFilterActive={isFilterByDateActive}
          handleClickCheckbox={handleClickToggleFilter}
        />
      </div>
      <div className="grid gap-2">
        <div className="join join-vertical md:join-horizontal">
          <button
            popoverTarget="rdp-popover"
            className="input join-item"
            style={{ anchorName: "--rdp" } as React.CSSProperties}
            disabled={!isFilterByDateActive}
          >
            {dateRange ? dateRange.from?.toLocaleDateString() : "Début"}
          </button>
          <button
            popoverTarget="rdp-popover"
            className="input join-item"
            style={{ anchorName: "--rdp" } as React.CSSProperties}
            disabled={!isFilterByDateActive}
          >
            {dateRange ? dateRange.to?.toLocaleDateString() : "Fin"}
          </button>
        </div>
        <div
          popover="auto"
          id="rdp-popover"
          className="dropdown dropdown-end shadow-xl"
          style={{ positionAnchor: "--rdp" } as React.CSSProperties}
        >
          <DayPicker
            className="bg-base-100 p-2 rounded te"
            mode="range"
            selected={dateRange}
            onSelect={onChange}
            classNames={{
              selected: `${defaultClassNames.selected} bg-primary-content!`,
              range_start: `${defaultClassNames.range_start} rounded-l-full`,
              range_end: `${defaultClassNames.range_end} rounded-r-full`,
            }}
          />
        </div>
        <button
          onClick={handleResetDateRange}
          className="btn"
          disabled={!dateRange || !isFilterByDateActive}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default DateFilter;
