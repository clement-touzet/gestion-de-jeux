import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../../ui/components/Modal";
import {
  GameReviewType,
  GameReviewUpdateType,
  GameType,
} from "../../../../../server/db/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import updateGameReview from "../queries/updateGameReview";
import { GAMES_REVIEWS_QUERY_KEY } from "../../../constants/queryKeys";

type Props = {
  visible: boolean;
  onClose: () => void;
  defaultValues: UpdateGameReviewInputs;
  gameId: GameType["id"];
};

type UpdateGameReviewInputs = {
  stars: GameReviewType["stars"];
  timePlayed: GameReviewType["timePlayed"];
};

const UpdateGameReviewModal = ({
  visible,
  onClose,
  defaultValues,
  gameId,
}: Props) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateGameReviewInputs>();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-game-review", gameId],
    mutationFn: (data: GameReviewUpdateType) =>
      updateGameReview(gameId, data, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GAMES_REVIEWS_QUERY_KEY] });
      onClose();
    },
  });

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
    reset({ ...defaultValues });
  };

  const onSubmit: SubmitHandler<UpdateGameReviewInputs> = (data) => {
    const stars = data.stars as unknown as string;
    mutation.mutate({
      ...data,
      stars: parseInt(stars),
    });
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <h1 className="text-xl font-bold pb-4">Modifier</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <label htmlFor="update-time-played-input" className="input">
            <input
              id="update-time-played-input"
              type="number"
              {...register("timePlayed", {
                min: 0,
                required: true,
                valueAsNumber: true,
              })}
              defaultValue={defaultValues.timePlayed}
            ></input>
            <span>heures</span>
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

          {/* stars rating inupt */}
          <label className="label" htmlFor="update-rating">
            Note
          </label>
          <div>
            <div className="rating mb-4" id="update-rating">
              <input
                {...register("stars", {
                  valueAsNumber: true,
                  required: true,
                })}
                type="radio"
                value={1}
                className="mask mask-star-2 bg-orange-400"
                aria-label="1 star"
                defaultChecked={1 === defaultValues.stars}
              />
              <input
                {...register("stars", { valueAsNumber: true })}
                type="radio"
                value={2}
                className="mask mask-star-2 bg-orange-400"
                aria-label="2 star"
                defaultChecked={2 === defaultValues.stars}
              />
              <input
                {...register("stars", { valueAsNumber: true })}
                type="radio"
                value={3}
                className="mask mask-star-2 bg-orange-400"
                aria-label="3 star"
                defaultChecked={3 == defaultValues.stars}
              />
              <input
                {...register("stars", { valueAsNumber: true })}
                type="radio"
                value={4}
                className="mask mask-star-2 bg-orange-400"
                aria-label="4 star"
                defaultChecked={4 === defaultValues.stars}
              />
              <input
                {...register("stars", { valueAsNumber: true })}
                type="radio"
                value={5}
                className="mask mask-star-2 bg-orange-400"
                aria-label="5 star"
                defaultChecked={5 === defaultValues.stars}
              />
            </div>
            {errors.stars?.type === "required" && (
              <p role="alert" className="text-error">
                Vous devez choisir une note
              </p>
            )}
          </div>
        </fieldset>
        <div className="modal-action">
          <button
            onClick={onCancel}
            className="btn btn-soft btn-sm btn-error  justify-start"
          >
            Annuler
          </button>

          <button className="btn btn-soft btn-sm btn-primary" type="submit">
            Confirmer la modification
          </button>
        </div>
        {mutation.isError ? (
          <p className="text-error">{mutation.error.message}</p>
        ) : null}
      </form>
    </Modal>
  );
};

export default UpdateGameReviewModal;
