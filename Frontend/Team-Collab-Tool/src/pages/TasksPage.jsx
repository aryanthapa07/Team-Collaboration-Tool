import TaskManager from "../components/TaskManager";
import Sidebar from "../components/Sidebar";
import { getToken } from "../services/LocalStorageService";
import Header from "../components/Header";

const TasksPage = () => {
  const { access_token } = getToken();
  const isLoggedIn = Boolean(access_token);

  return (
    <main className="relative bg-gray-100 ">
      <Header />
      <div className="flex">
        <Sidebar isLoggedIn={isLoggedIn} />
        <section className="flex min-h-screen flex-1 flex-col pt-20">
          <div className="w-full h-full relative">
            <TaskManager />
          </div>
        </section>
      </div>
    </main>
  );
};

export default TasksPage;
