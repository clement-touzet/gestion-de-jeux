import { useState } from "react";
import FilterCategory from "./FilterCategory";
import { DateRange, DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

const DateFilter = () => {
  const [isFilterByDateActive, setIsFilterByDateActive] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const defaultClassNames = getDefaultClassNames();
  const handleClickToggleFilter = () => {
    setIsFilterByDateActive((prev) => !prev);
  };

  const handleResetDateRange = () => {
    setDateRange(undefined);
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
            onSelect={setDateRange}
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
