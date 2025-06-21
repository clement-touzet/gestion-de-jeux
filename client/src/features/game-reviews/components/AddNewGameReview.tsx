import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import Modal from "../../ui/components/Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getGames from "../../games/queries/getGames";
import { GameType } from "../../../../../server/db/schemas/game/game";
import AddNewGameModal from "../../games/components/AddNewGameModal";
import {
  GAMES_QUERY_KEY,
  GAMES_REVIEWS_QUERY_KEY,
} from "../../../constants/queryKeys";
import { SubmitHandler, useForm } from "react-hook-form";
import addGameReview from "../queries/addGameReview";
import classNames from "classnames";
import { axiosPrivate } from "../../../utils/axios";
import { InsertGameReviewType } from "../../../../../server/db/schemas/game/gameReview";

type Inputs = {
  gameId: GameType["id"];
  timePlayed: number;
  stars: string; // can't be a number as stars inputs are radio buttons
};

const AddNewGameReview = () => {
  const [isModalNewReviewOpen, setIsModalNewReviewOpen] = useState(false);
  const [isModalNewGameOpen, setIsModalNewGameOpen] = useState(false);

  const queryClient = useQueryClient();
  const {
    formState: { errors },
    register,
    reset,
    clearErrors,
    handleSubmit,
  } = useForm<Inputs>();

  const { data: availableGames } = useQuery<GameType[]>({
    queryKey: [GAMES_QUERY_KEY],
    queryFn: getGames,
  });

  const mutation = useMutation({
    mutationFn: (data: Omit<InsertGameReviewType, "userId">) =>
      addGameReview(data, axiosPrivate),
    mutationKey: [GAMES_REVIEWS_QUERY_KEY],
    onSuccess: () => {
      reset();
      closeReviewModal();
      // invalidates all queries that got in there queryKey GAMES_REVIEW_QUERY_KEY
      queryClient.invalidateQueries({ queryKey: [GAMES_REVIEWS_QUERY_KEY] });
    },
  });

  const closeReviewModal = () => {
    setIsModalNewReviewOpen(false);
  };

  const handleCloseReviewModal = () => {
    closeReviewModal();
  };

  const handleCloseGameModal = () => {
    setIsModalNewGameOpen(false);
  };

  const handleClick = () => {
    setIsModalNewReviewOpen(true);
  };

  const openModalNewGame = () => {
    setIsModalNewGameOpen(true);
  };

  const handleClickCancelReview = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    reset();
    clearErrors();
    closeReviewModal();
    mutation.reset();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data du formulaire", data);

    mutation.mutate({ ...data, stars: parseInt(data.stars) });
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleClick}>
        <RiAddLine />
        Nouveau
      </button>
      <Modal
        visible={isModalNewReviewOpen}
        onClose={handleCloseReviewModal}
        modalBoxClassName={"max-w-80 md:max-w-90"}
      >
        <h1 className="font-bold text-xl pb-4 max-w-">
          A quel jeu avez vous joué ?
        </h1>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label" htmlFor="gameId">
              Jeu
            </label>
            <div>
              <select
                id="gameId"
                defaultValue={""}
                className={classNames("input", {
                  "input-error": errors.gameId,
                })}
                {...register("gameId", { required: true })}
              >
                <option value={""} disabled={true}>
                  Choisir un jeu
                </option>
                {availableGames && availableGames.length > 0 ? (
                  availableGames.map((game) => {
                    return (
                      <option key={game.id} value={game.id}>
                        {game.name}
                      </option>
                    );
                  })
                ) : (
                  <option disabled={true}>Aucun jeu trouvé</option>
                )}
              </select>
              {errors.gameId?.type === "required" && (
                <p role="alert" className="text-error">
                  Veuillez sélectionner un jeu
                </p>
              )}
              <div className="flex gap-0.5 mb-2">
                <p>
                  Vous ne trouvez pas votre jeu ?{" "}
                  <span
                    className="link link-primary link-hover"
                    onClick={openModalNewGame}
                  >
                    Cliquez ici pour l'ajouter !
                  </span>
                </p>
              </div>
            </div>

            <label className="label">Temps de jeu (en heures)</label>
            <div>
              <label
                className={classNames("input", {
                  "input-error": errors.timePlayed,
                })}
                htmlFor="timePlayed"
              >
                <input
                  id="timePlayed"
                  type="number"
                  placeholder="Temps de jeu"
                  min={0}
                  {...register("timePlayed", {
                    required: true,
                    min: 0,
                    valueAsNumber: true,
                  })}
                />
                <span className="label">heures</span>
              </label>
              {errors.timePlayed?.type === "required" && (
                <p role="alert" className="text-error">
                  Le nombre d'heures jouées est requis
                </p>
              )}
              {errors.timePlayed?.type === "required" && (
                <p role="alert" className="text-error">
                  Le nombre d'heures doit être supérieur à 0
                </p>
              )}
            </div>
            <label className="label" htmlFor="rating">
              Note
            </label>
            <div>
              <div className="rating mb-4" id="rating">
                <input
                  {...register("stars", {
                    valueAsNumber: true,
                    required: true,
                  })}
                  type="radio"
                  value={1}
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="1 star"
                />
                <input
                  {...register("stars", { valueAsNumber: true })}
                  type="radio"
                  value={2}
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="2 star"
                />
                <input
                  {...register("stars", { valueAsNumber: true })}
                  type="radio"
                  value={3}
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="3 star"
                />
                <input
                  {...register("stars", { valueAsNumber: true })}
                  type="radio"
                  value={4}
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="4 star"
                  defaultChecked
                />
                <input
                  {...register("stars", { valueAsNumber: true })}
                  type="radio"
                  value={5}
                  className="mask mask-star-2 bg-orange-400"
                  aria-label="5 star"
                />
              </div>
              {errors.stars?.type === "required" && (
                <p role="alert" className="text-error">
                  Vous devez choisir une note
                </p>
              )}
            </div>
          </fieldset>

          <div className="w-full flex gap-4 justify-end">
            <button onClick={handleClickCancelReview} className="btn">
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              Valider
            </button>
          </div>
        </form>
        {mutation.isError ? (
          <p className="text-error">{mutation.error.message}</p>
        ) : null}
      </Modal>

      <AddNewGameModal
        visible={isModalNewGameOpen}
        onClose={handleCloseGameModal}
      />
    </div>
  );
};

export default AddNewGameReview;
