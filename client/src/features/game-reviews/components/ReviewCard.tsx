import { RiDeleteBin7Line, RiMore2Fill, RiPencilLine } from "react-icons/ri";
import { GameType } from "../../../../../server/db/schemas/game/game";
import { GameReviewType } from "../../../../../server/db/schemas/game/gameReview";
import { Link } from "@tanstack/react-router";
import Modal from "../../ui/components/Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GAMES_REVIEWS_QUERY_KEY } from "../../../constants/queryKeys";
import deleteGameReview from "../queries/deleteGameReview";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";

type Props = {
  timePlayed: GameReviewType["timePlayed"];
  stars: GameReviewType["stars"];
  gameName: GameType["name"];
  gameId: GameType["id"];
};

const ReviewCard = ({
  timePlayed,
  stars: starsNumber,
  gameName,
  gameId,
}: Props) => {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const axiosPrivate = useAxiosPrivate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: [GAMES_REVIEWS_QUERY_KEY, gameId],
    mutationFn: () => deleteGameReview(gameId, axiosPrivate),
    onSuccess: () => {
      console.log("deleted");
      setIsConfirmDeleteModalOpen(false);
      queryClient.invalidateQueries({ queryKey: [GAMES_REVIEWS_QUERY_KEY] });
    },
    onError: () => {},
  });

  const showModalConfirmDelete = () => {
    setIsConfirmDeleteModalOpen(true);
  };

  const onCloseModalConfirmDelete = () => {
    setIsConfirmDeleteModalOpen(false);
  };

  const onDeleteGameReview = () => {
    mutation.mutate();
  };

  return (
    <div className="card bg-base-100 w-80 shadow-sm relative ">
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
      {/* <div id="menu-button-review-card">
        <button className="btn btn-square btn-sm absolute top-2 right-2">
          <RiMore2Fill />
        </button>
      </div> */}
      <div className="absolute top-2 right-2" id="menu-button-review-card">
        <div className="dropdown dropdown-end  ">
          <div tabIndex={0} role="button" className="btn btn-square btn-ghost">
            <RiMore2Fill />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content border-1 border-base-300 shadow-lg menu bg-base-100 rounded-box z-1 w-52 p-2 gap-1"
          >
            <Link to="" className="btn btn-sm btn-ghost justify-start">
              <RiPencilLine />
              Modifier
            </Link>

            <button
              className="btn btn-soft btn-sm btn-error justify-start"
              onClick={showModalConfirmDelete}
            >
              <RiDeleteBin7Line />
              Supprimer
            </button>
          </ul>
        </div>
      </div>
      <Modal
        visible={isConfirmDeleteModalOpen}
        onClose={onCloseModalConfirmDelete}
      >
        <h2 className="font-bold text-xl">
          Etes-vous sûr de vouloir supprimer votre avis sur {gameName} ?
        </h2>
        <div className="modal-action">
          <button className="btn" onClick={onCloseModalConfirmDelete}>
            Non, annuler
          </button>
          <button className="btn btn-error" onClick={onDeleteGameReview}>
            Oui, supprimer
          </button>
        </div>
        {mutation.error ? <p>{mutation.error.message}</p> : null}
      </Modal>
    </div>
  );
};

export default ReviewCard;
