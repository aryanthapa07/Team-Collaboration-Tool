import ProjectsManager from "../components/ProjectsManager";
import Sidebar from "../components/Sidebar";
import Dashboardheader from "../components/DashboardHeader";
import { getToken } from "../services/LocalStorageService";

const ProjectsPage = () => {
  const {access_token}=getToken();
  const isLoggedIn=Boolean(access_token);
  return (
    <main className="relative bg-gray-100 ">
      <Dashboardheader />
      <div className="flex">
        <Sidebar isLoggedIn={isLoggedIn}/>
        <section className="flex min-h-screen flex-1 flex-col pt-20">
          <ProjectsManager />
        </section>
      </div>
    </main>
  );
};

export default ProjectsPage;
