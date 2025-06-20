import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../../ui/components/Modal";
import addGame from "../queries/AddGame";
import { SubmitHandler, useForm } from "react-hook-form";
import classNames from "classnames";
import { GAMES_QUERY_KEY } from "../../../constants/queryKeys";

type Inputs = {
  name: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
};

const AddNewGameModal = ({ visible, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<Inputs>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addGame,
    mutationKey: [GAMES_QUERY_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GAMES_QUERY_KEY] });
      reset();
      clearErrors();
      onClose();
    },
  });

  const handleClickCancelGame = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    onClose();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <Modal visible={visible} onClose={onClose}>
        <h1 className="text-xl font-bold pb-4">Nouveau jeu</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Nom du jeu</label>
            <div className="mb-4">
              <input
                className={classNames("input", {
                  "input-error": errors.name,
                })}
                placeholder="Nom du jeu"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p role="alert" className="text-error">
                  Le nom est requis
                </p>
              )}
            </div>
          </fieldset>

          <div className="w-full flex gap-4 justify-end">
            <button className="btn" onClick={handleClickCancelGame}>
              Annuler
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={mutation.isPending}
            >
              Valider
              {mutation.isPending ? (
                <span className="loading loading-spinner"></span>
              ) : null}
            </button>
          </div>
        </form>
        {mutation.isError ? (
          <p className="text-error">{mutation.error.message}</p>
        ) : null}
      </Modal>
    </div>
  );
};

export default AddNewGameModal;
