import DashboardAsideContent from "./DashboardAsideContent";

const DashboardAside = () => {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-base-300">
        <DashboardAsideContent />
      </div>
    </aside>
  );
};

export default DashboardAside;
