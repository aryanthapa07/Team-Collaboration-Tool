import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getToken } from "../services/LocalStorageService";
import UserTable from "../components/UserTable";
const UsersPage = () => {
  const { access_token } = getToken();
  const isLoggedIn = Boolean(access_token);
  return (
    <main className="relative bg-gray-100 ">
      <Header />
      <div className="flex">
        <Sidebar isLoggedIn={isLoggedIn} />
        <section className="flex min-h-screen flex-1 flex-col pt-20 items-center">
          <div>
            <h2 className="headingStyle">Users Data</h2>
          </div>
          <div className="w-[90%] h-full relative">
            <UserTable />
          </div>
        </section>
      </div>
    </main>
  );
};

export default UsersPage;
