import { GameReviewType, GameType } from "../../../../../server/db/schemas";

type Props = {
  gameName: GameType["name"];
  totalTimePlayed: GameReviewType["timePlayed"];
  trendingPosition: number;
};

const GameCard = ({ gameName, totalTimePlayed, trendingPosition }: Props) => {
  return (
    <div className="p-4 bg-base-200 border-1 shadow-[4px_4px_0px_0px] rounded min-w-80 flex gap-4 items-center">
      <p className="text-7xl italic font-extrabold">#{trendingPosition}</p>
      <div className="">
        <h3 className="text-xl font-semibold">{gameName}</h3>
        {totalTimePlayed ? (
          <p className="text-sm text-neutral-500">
            Heures jouées cumulées : {totalTimePlayed ?? 0}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default GameCard;
