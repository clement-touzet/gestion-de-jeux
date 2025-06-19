import { createFileRoute } from "@tanstack/react-router";
import Section from "../../../features/ui/components/Section";
import { RiAddLine, RiFilter3Line } from "react-icons/ri";
import { useState } from "react";
import Modal from "../../../features/ui/components/Modal";
import ReviewCardsSection from "../../../features/game-reviews/components/ReviewCardsSection";
import ReviewCard from "../../../features/game-reviews/components/ReviewCard";
import { useQuery } from "@tanstack/react-query";
import getUserGamesReviews from "../../../features/game-reviews/queries/getUserGamesReviews";
import requireAuth from "../../../features/auth/utils/requireAuth";
import useAxiosPrivate from "../../../features/auth/hooks/useAxiosPrivate";

export const Route = createFileRoute("/dashboard/games-reviews/")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    requireAuth(context.authentication.auth.userId, location);
  },
});

function RouteComponent() {
  const [isModalNewReviewOpen, setIsModalNewReviewOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleCloseModal = () => {
    setIsModalNewReviewOpen(false);
  };
  const { data: gamesReviews } = useQuery({
    queryKey: ["user-games-reviews"],
    queryFn: () => getUserGamesReviews(axiosPrivate),
  });
  console.log("data in component", gamesReviews);
  return (
    <div>
      <h1 className="font-bold text-2xl">Mes jeux</h1>
      {/* search input */}
      <Section>
        <input
          className="input"
          placeholder="Rechercher..."
          type="text"
          name="search"
        ></input>
        {/* filter by dropdown */}
        <details className="dropdown">
          <summary className="btn m-1">
            <RiFilter3Line />
            Filtre
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <a>Nom du jeu</a>
            </li>
            <li>
              <a>Note </a>
            </li>
            <li>
              <a>Date d'ajout </a>
            </li>
            <li>
              <a>Temps passé </a>
            </li>
          </ul>
        </details>
        {/* add new button */}
        <button className="btn btn-primary">
          <RiAddLine />
          Nouveau
        </button>
        <Modal visible={isModalNewReviewOpen} onClose={handleCloseModal}>
          <h1 className="text-bold font-xl">A quel jeu avez vous joué ?</h1>
          <form>
            <label className="text-bold font-lg">Jeu</label>
            {/* afficher la liste des jeux */}
            <input></input>
          </form>
        </Modal>

        <ReviewCardsSection>
          {/* {gamesReviews.map((review) => {
            return <ReviewCard />;
          })} */}
        </ReviewCardsSection>
      </Section>
    </div>
  );
}
