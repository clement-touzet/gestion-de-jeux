import { createFileRoute, Link } from "@tanstack/react-router";
import LoginNavbar from "../../features/ui/layouts/login-navbar/LoginNavbar";
import LoginForm from "../../features/users/components/login/LoginForm";

export const Route = createFileRoute("/login/")({
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
              <h1 className="card-title">Se connecter</h1>
              <p className="text-neutral-400">
                Nouveau ?{" "}
                <Link to="/register" className="link">
                  Inscrivez-vous ici
                </Link>
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
