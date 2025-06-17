const RegisterForm = () => {
  return (
    <form className="">
      <fieldset className="fieldset">
        <label className="label">Pseudo</label>
        <input
          type="text"
          className="input"
          placeholder="Pseudo"
          name="pseudonym"
        />
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
        {/* <div>
          <a className="link link-hover">Mot de passe oublié?</a>
        </div> */}
        <button className="btn btn-primary mt-4">Valider l'inscription</button>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
