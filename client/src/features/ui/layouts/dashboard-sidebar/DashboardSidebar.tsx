import MobileSidebar from "./MobileSidebar";
import DashboardAside from "./DashboardAside";
import { Outlet } from "@tanstack/react-router";
const DashboardSidebar = () => {
  return (
    <div>
      <MobileSidebar />
      <DashboardAside />

      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardSidebar;
