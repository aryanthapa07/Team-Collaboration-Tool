import WorkspaceManager from "../components/WorkspaceManager";
import Sidebar from "../components/Sidebar";
import { getToken } from "../services/LocalStorageService";
import Dashboardheader from "../components/DashboardHeader";

const WorkspacePage = () => {
  const { access_token } = getToken();
  const isLoggedIn = Boolean(access_token);

  return (
    <main className="relative bg-gray-100 ">
      <Dashboardheader />
      <div className="flex">
        <Sidebar isLoggedIn={isLoggedIn} />
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
