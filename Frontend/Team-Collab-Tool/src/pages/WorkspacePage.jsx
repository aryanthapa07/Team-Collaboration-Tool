import WorkspaceManager from "../components/WorkspaceManager";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
const WorkspacePage = () => {
  return (
    <main className="relative bg-gray-100 ">
      <Header />
      <div className="flex">
        <Sidebar />
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
