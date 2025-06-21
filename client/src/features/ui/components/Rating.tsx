import React from "react";
import { GameReviewFiltersType } from "../../game-reviews/types/GameReviewFiltersType";

type Props = {
  value: GameReviewFiltersType["stars"];
  handleChangeValue: (newRating: string) => void;
  disabled: boolean;
};

const Rating = ({ value, handleChangeValue, disabled, ...props }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeValue(e.target.value);
  };

  return (
    <div>
      <input
        type="number"
        min={1}
        max={5}
        value={value}
        onChange={handleChange}
        className="input w-16"
        disabled={disabled}
        {...props}
      />
      <label className="étoiles pl-2">étoiles</label>
    </div>
  );
};

export default Rating;
