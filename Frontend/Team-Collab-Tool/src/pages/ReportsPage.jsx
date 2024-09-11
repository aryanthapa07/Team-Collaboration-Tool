import { getToken } from "../services/LocalStorageService";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskReport from "../components/TaskReport";
const ReportsPage = () => {
    const { access_token } = getToken();
  const isLoggedIn = Boolean(access_token);
  return (
    <main className="relative bg-gray-100 ">
      <Header />
      <div className="flex">
        <Sidebar isLoggedIn={isLoggedIn} />
        <section className="flex min-h-screen flex-1 flex-col pt-20 items-center">
          <div className="w-[90%] h-full relative">
            <TaskReport/>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ReportsPage
