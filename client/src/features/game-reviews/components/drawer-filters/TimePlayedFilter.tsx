import { useState } from "react";
import FilterCategory from "./FilterCategory";

const TimePlayedFilter = () => {
  const [isFilterByTimePlayedActive, setIsFilterByTimePlayedActive] =
    useState(false);
  const [timePlayed, setTimePlayed] = useState<number | undefined>(undefined);

  const handleClickToggleFilter = () => {
    setIsFilterByTimePlayedActive((prev) => !prev);
  };

  const handleResetTimePlayed = () => {
    setTimePlayed(0);
  };

  const handleChangeTimePlayed = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimePlayed(parseInt(event.target.value));
  };
  return (
    <div>
      <div className="pb-4">
        <FilterCategory
          title="Filtrer par temps de jeu"
          isFilterActive={isFilterByTimePlayedActive}
          handleClickCheckbox={handleClickToggleFilter}
        />
      </div>
      <div className="grid gap-2">
        <label className="input">
          <input
            className=""
            type="number"
            name="timePlayed"
            value={timePlayed}
            onChange={handleChangeTimePlayed}
            placeholder="Temps de jeu"
            min={0}
            disabled={!isFilterByTimePlayedActive}
          />
          <span className="label">heures</span>
        </label>
        <button
          onClick={handleResetTimePlayed}
          className="btn"
          disabled={!isFilterByTimePlayedActive}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default TimePlayedFilter;
