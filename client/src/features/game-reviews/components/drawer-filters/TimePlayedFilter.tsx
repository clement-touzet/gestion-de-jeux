import { useEffect, useState } from "react";
import FilterCategory from "./FilterCategory";
import { GameReviewFiltersType } from "../../types/GameReviewFiltersType";

type Props = {
  // timePlayed: GameReviewFiltersType["timePlayed"];
  onChange: (newTimePlayed: GameReviewFiltersType["timePlayed"]) => void;
  isFilterByTimePlayedActive: boolean;
  setIsFilterByTimePlayedActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const TimePlayedFilter = ({
  onChange,
  isFilterByTimePlayedActive,
  setIsFilterByTimePlayedActive,
}: Props) => {
  const [minTimePlayed, setMinTimePlayed] = useState<number>(0);
  const [maxTimePlayed, setMaxTimePlayed] = useState<number>(0);

  const handleClickToggleFilter = () => {
    setIsFilterByTimePlayedActive((prev) => !prev);
  };

  const handleResetTimePlayed = () => {
    setMinTimePlayed(0);
    setMaxTimePlayed(0);
  };

  useEffect(() => {
    onChange({
      min: minTimePlayed,
      max: maxTimePlayed,
    });
  }, [minTimePlayed, maxTimePlayed, onChange]);

  const handleChangeMinTimePlayed = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMinTimePlayed(parseInt(event.target.value));
  };

  const handleChangeMaxTimePlayed = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxTimePlayed(parseInt(event.target.value));
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
        <label className="label">Minimum</label>
        <label className="input">
          <input
            className=""
            type="number"
            name="timePlayed"
            value={minTimePlayed}
            onChange={handleChangeMinTimePlayed}
            min={0}
            disabled={!isFilterByTimePlayedActive}
          />
          <span className="label">heures</span>
        </label>
        <label className="label">Maximum</label>
        <label className="input">
          <input
            className=""
            type="number"
            name="timePlayed"
            value={maxTimePlayed}
            onChange={handleChangeMaxTimePlayed}
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
