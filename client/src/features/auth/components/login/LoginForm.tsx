import { Link, useNavigate } from "@tanstack/react-router";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

type Inputs = {
  email: string;
  password: string;
};

const LOGIN_API_URL = "/api/auth/login";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setError,
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const resultJson = await result.json();
    console.log("login result", result);
    if (result.status === 200) {
      setAuth((prev) => ({
        ...prev,
        accessToken: resultJson.accessToken,
        userId: resultJson.userId,
      }));
      navigate({
        to: "/dashboard",
      });
    } else {
      console.log("error");
      setError("root.error", {
        type: result.status.toString(),
        message:
          resultJson.message ||
          "Une erreur est survenue, veuillez réessayer plus tard",
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

        <button
          type="submit"
          className={classNames("btn btn-primary mt-4", {
            "btn-disabled": isLoading,
          })}
        >
          Se connecter
        </button>
        {errors.root?.error && (
          <span className="text-error">{errors.root.error.message}</span>
        )}
      </fieldset>
    </form>
  );
};

export default LoginForm;
