import WorkspaceManager from "../components/WorkspaceManager";
import Dashboard from "../components/Dashboard";
import Dashboardheader from "../components/DashboardHeader";
const WorkspacePage = () => {
  return (
    <main className="relative bg-gray-100 ">
      <Dashboardheader />
      <div className="flex">
        <Dashboard />
        <section className="flex min-h-screen flex-1 flex-col pt-20">
          <div className="w-full h-full relative">
            <WorkspaceManager />
          </div>
        </section>
      </div>
    </main>
  );
};

export default WorkspacePage;
