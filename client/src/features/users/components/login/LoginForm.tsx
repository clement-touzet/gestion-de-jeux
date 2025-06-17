import { Link } from "@tanstack/react-router";

const LoginForm = () => {
  return (
    <form className="">
      <fieldset className="fieldset">
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          name="email"
          required
        />
        <label className="label">Mot de passe</label>
        <input
          type="password"
          className="input"
          placeholder="Mot de passe"
          name="password"
          required
        />
        <div>
          <Link to="/" className="link link-hover">
            Mot de passe oublié?
          </Link>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Se connecter
        </button>
      </fieldset>
    </form>
  );
};

export default LoginForm;
