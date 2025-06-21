import React, { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebouce";
import classNames, { Argument } from "classnames";

type Props = {
  className?: Argument;
  onChange: (search: string) => void;
};
const SearchInput = ({ className, onChange }: Props) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    onChange(debouncedSearch);
  }, [debouncedSearch, onChange]);

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <input
      className={classNames("input", className)}
      placeholder="Rechercher..."
      type="text"
      name="search"
      value={search}
      onChange={handleChangeSearchInput}
    />
  );
};

export default SearchInput;
