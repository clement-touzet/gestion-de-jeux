type Props = {
  title: string;
  isFilterActive: boolean;
  handleClickCheckbox: () => void;
};

const FilterCategory = ({
  title,
  isFilterActive,
  handleClickCheckbox,
}: Props) => {
  const handleClick = () => {
    handleClickCheckbox();
  };

  return (
    <div className="flex gap-2 items-center pb-2">
      <input
        type="checkbox"
        checked={isFilterActive}
        onChange={handleClick}
        className="checkbox"
      />
      <h2 className="font-bold text-lg">{title}</h2>
    </div>
  );
};

export default FilterCategory;
