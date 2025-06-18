import { Link, useNavigate } from "@tanstack/react-router";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import useAccessToken from "../../hooks/useAccessToken";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setError,
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const { setAccessToken } = useAccessToken();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const resultJson = await result.json();
    console.log("login result", result);
    if (result.status === 200) {
      setAccessToken(resultJson.accessToken);
      navigate({
        to: "/dashboard",
      });
    } else {
      console.log("error");
      setError("root.error", {
        type: result.status.toString(),
        message: resultJson.message || "An error occurred, please try later",
      });
    }
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset">
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-error">Ce champ est requis</span>
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
        <div>
          <Link to="/" className="link link-hover">
            Mot de passe oublié?
          </Link>
        </div>
        <button
          type="submit"
          className={classNames("btn btn-primary mt-4", {
            "btn-disabled": isLoading,
          })}
        >
          Se connecter
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

export default LoginForm;
