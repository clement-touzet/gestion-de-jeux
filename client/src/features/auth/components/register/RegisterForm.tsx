import { useForm, SubmitHandler } from "react-hook-form";
import classnames from "classnames";
import { useNavigate } from "@tanstack/react-router";
import useAccessToken from "../../hooks/useAccessToken";

type Inputs = {
  pseudonym: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setError,
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const { setAccessToken } = useAccessToken();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const resultJson = await result.json();

    if (result.status === 201) {
      setAccessToken(resultJson.accessToken);
      navigate({
        to: "/dashboard",
      });
    } else {
      setError("root.error", {
        type: result.status.toString(),
        message: resultJson.message || "An error occurred, please try later",
      });
    }
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset">
        <label className="label">Pseudo</label>
        <input
          type="text"
          className="input"
          placeholder="Pseudo"
          {...register("pseudonym", { required: true })}
        />
        {errors.pseudonym && (
          <span className="text-error">Ce champ est requis</span>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-error">Ce champ est requit</span>
        )}
        <label className="label">Mot de passe</label>
        <input
          type="password"
          className="input"
          placeholder="Mot de passe"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-error">Ce champ est requit</span>
        )}
        {/* <div>
          <a className="link link-hover">Mot de passe oublié?</a>
        </div> */}
        <button
          type="submit"
          className={classnames("btn btn-primary mt-4", {
            "btn-disabled": isLoading,
          })}
        >
          Valider l'inscription
        </button>
        {errors.root?.error && (
          <span className="text-error">
            Une erreur est survenue : {errors.root.error.message}
          </span>
        )}
      </fieldset>
    </form>
  );
};

export default RegisterForm;
