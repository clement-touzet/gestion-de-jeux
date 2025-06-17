import { RxHamburgerMenu } from "react-icons/rx";
import HomeNavbarCTA from "./HomeNavbarCTA";
import Modal from "../../components/Modal";
import { useState } from "react";
import StatiGamesLogo from "../../components/StatiGamesLogo";

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
        {/* for mobile */}
        <div className="md:hidden">
          <button className="btn btn-square" onClick={handleClickOpenModal}>
            <RxHamburgerMenu />
          </button>
          <Modal visible={isModalVisible} onClose={onModalClose} />
        </div>

        {/* not for mobiile */}
        <div className="hidden md:block">
          <HomeNavbarCTA />
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
