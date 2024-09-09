// import React from 'react'
import Dashboardheader from "../components/DashboardHeader";
import LoggedinHomepage from "../components/LoggedinHomepage";
import Sidebar from "../components/Sidebar";
import { getToken } from "../services/LocalStorageService";
// renders the page after user logs in
function Loggedinpage() {
  // Check if the user is logged in by checking the token
  const { access_token } = getToken();
  const isLoggedIn = Boolean(access_token);
  console.log("loggedin?",isLoggedIn) // Convert to boolean to pass as prop
  return (
    <main className="relative bg-gray-100 ">
      <Dashboardheader />
      <div className="flex">
        <Sidebar isLoggedIn={isLoggedIn} />
        <section className="flex min-h-screen flex-1 flex-col pt-20">
          <div className="w-full h-full relative">
            <LoggedinHomepage />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Loggedinpage;
