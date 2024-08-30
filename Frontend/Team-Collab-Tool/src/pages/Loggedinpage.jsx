// import React from 'react'
import Dashboard from "../components/dashboard"
import Dashboardheader from "../components/dashboardheader"
import HomePage from "../components/homepage"
function Loggedinpage() {
  return (
    <main className="relative bg-gray-100 ">
      <Dashboardheader/>
      <div className="flex">
        <Dashboard />
        <section className="flex min-h-screen flex-1 flex-col pt-20">
          <div className="w-full h-full relative"><HomePage/></div>
        </section>
      </div>
    </main>
  )
}

export default Loggedinpage
