// import React from 'react'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import HomePage from "../components/Homepage";
// renders the content for the start page
function Startpage() {
  return (
    <main className="relative bg-gray-100 ">
      <Header />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col pt-20">
          <div className="w-full h-full relative">
            <HomePage />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Startpage;
