import { Link } from "@tanstack/react-router";
import { useState } from "react";

const SearchGame = () => {
  const [gameName, setGameName] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameName(event.target.value);
  };

  return (
    <div className="join">
      <input
        className="input rounded-l"
        placeholder="Rechercher un jeu..."
        value={gameName}
        onChange={onChange}
      />
      <Link
        to="/dashboard/search-game/$gameName"
        params={{
          gameName: gameName,
        }}
        className="btn rounded-r"
      >
        Rechercher
      </Link>
    </div>
  );
};

export default SearchGame;
