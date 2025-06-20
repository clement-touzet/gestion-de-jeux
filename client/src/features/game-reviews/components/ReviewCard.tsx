import { GameType } from "../../../../../server/db/schemas/game/game";
import { GameReviewType } from "../../../../../server/db/schemas/game/gameReview";

type Props = {
  timePlayed: GameReviewType["timePlayed"];
  stars: GameReviewType["stars"];
  gameName: GameType["name"];
};

const ReviewCard = ({ timePlayed, stars: starsNumber, gameName }: Props) => {
  return (
    <div className="card bg-base-100 w-80 shadow-sm">
      <button></button>
      <div className="card-body">
        <div className="">
          <h2 className="card-title line-clamp-1">{gameName}</h2>
          {timePlayed === 1 ? (
            <p className="text-neutral-400">{timePlayed} heure jouée</p>
          ) : (
            <p className="text-neutral-400">{timePlayed} heures jouées</p>
          )}
        </div>
        <div className="rating">
          {[...Array(starsNumber).keys()].map((currentStarIndex) => {
            const currentStar = currentStarIndex + 1;

            return (
              <div
                key={currentStar}
                className="mask mask-star-2 bg-orange-400"
                aria-label={`${currentStar} star`}
                aria-current={currentStar === starsNumber}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
