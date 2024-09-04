import ProjectsManager from "../components/ProjectsManager";
import Dashboard from "../components/dashboard";
import Dashboardheader from "../components/dashboardheader";

const ProjectsPage = () => {
  return (
    <main className="relative bg-gray-100 ">
        <Dashboardheader/>
        <div className="flex">
            <Dashboard/>
            <section className="flex min-h-screen flex-1 flex-col pt-20">
                <ProjectsManager/>
            </section>
        </div>
    </main>
  )
}

export default ProjectsPage
