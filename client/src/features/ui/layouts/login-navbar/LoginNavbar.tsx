import StatiGamesLogo from "../../components/StatiGamesLogo";

const LoginNavbar = () => {
  return (
    <>
      <div className="p-4 absolute top-0 w-full z-50">
        <div className="navbar shadow p-4 justify-between bg-base-100 h-16">
          <StatiGamesLogo />
        </div>
      </div>
    </>
  );
};

export default LoginNavbar;
