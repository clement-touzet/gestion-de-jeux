import { RxHamburgerMenu } from "react-icons/rx";
import HomeNavbarCTA from "./HomeNavbarCTA";
import Modal from "../../components/Modal";
import { useState } from "react";
import StatiGamesLogo from "../../components/StatiGamesLogo";
import { Link } from "@tanstack/react-router";

const HomeNavbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const handleClickOpenModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="p-4 absolute top-0 w-full z-50">
      <div className="navbar shadow p-4 justify-between bg-base-100 h-16">
        <StatiGamesLogo />
        <div>
          <Link to="/dashboard/browse" className="link link-hover">
            Parcourir les jeux
          </Link>
        </div>
        {/* for mobile */}
        <div className="md:hidden">
          <button className="btn btn-square" onClick={handleClickOpenModal}>
            <RxHamburgerMenu />
          </button>
          <Modal visible={isModalVisible} onClose={onModalClose}>
            <HomeNavbarCTA />
          </Modal>
        </div>

        {/* not for mobile */}
        <div className="hidden md:block">
          <HomeNavbarCTA />
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
