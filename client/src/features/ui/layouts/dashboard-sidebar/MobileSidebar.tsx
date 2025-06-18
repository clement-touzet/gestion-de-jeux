import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import DashboardAsideContent from "./DashboardAsideContent";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const MobileSidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleClickShowSidebar = () => {
    setIsSidebarVisible(true);
  };

  const toggleDrawer = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  const closeDrawer = () => {
    setIsSidebarVisible(false);
  };

  return (
    <div>
      <button
        aria-controls="default-sidebar"
        type="button"
        className="btn btn-square inline-flex items-center p-2 mt-2 ms-3 text-sm  sm:hidden focus:outline-none focus:ring-2"
        onClick={handleClickShowSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <RxHamburgerMenu />
      </button>
      <Drawer
        open={isSidebarVisible}
        onClose={toggleDrawer}
        direction="left"
        className="p-4 bg-base-300"
      >
        <DashboardAsideContent handleCloseDrawer={closeDrawer} />
      </Drawer>
    </div>
  );
};

export default MobileSidebar;
