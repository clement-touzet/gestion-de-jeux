import { createFileRoute, Link } from "@tanstack/react-router";
import RegisterForm from "../../features/users/components/register/RegisterForm";
import LoginNavbar from "../../features/ui/layouts/login-navbar/LoginNavbar";

export const Route = createFileRoute("/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <LoginNavbar />
      <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <div className="flex items-center flex-col">
              <h1 className="card-title">Inscription</h1>
              <p className="text-neutral-400">
                Déjà inscrit ?{" "}
                <Link to="/login" className="link">
                  Se connecter
                </Link>
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
}
