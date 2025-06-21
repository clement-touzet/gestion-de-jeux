import React from "react";

type Props = {
  value: number;
  handleChangeValue: (newRating: string) => void;
  disabled: boolean;
};

const Rating = ({ value, handleChangeValue, disabled, ...props }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeValue(e.target.value);
  };

  return (
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
  );
};

export default Rating;
