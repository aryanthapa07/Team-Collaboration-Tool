import Header from "./components/header"
import Sidebar from "./components/sidebar"
import HomePage from "./components/homepage"
import LoginPage from "./components/loginpage"
import SignupPage from "./components/signuppage"
import Forgetpass from "./components/forgetpass"
import Dashboard from "./components/dashboard"
import Dashboardheader from "./components/dashboardheader"
import { createBrowserRouter , RouterProvider } from "react-router-dom"
function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:
   

<main className="relative bg-gray-100 ">
<Header/>
<div className="flex">
  <Sidebar />
  <section className="flex min-h-screen flex-1 flex-col pt-20">
    <div className="w-full h-full relative"><HomePage/></div>
  </section>
</div>
</main>
    },
    {
      path:"/login",
      element:<div className="pt-20"><Header/><LoginPage/></div>
    },
    {
      path:"/signup",
      element:<div className="pt-20"><Header/><SignupPage/></div>
    },
    {
      path:"/reset-password",
      element:<div className="pt-20"><Header/><Forgetpass/></div>
    },
    {
      path:"/dashboard",
      element:<main className="relative bg-gray-100 ">
      <Dashboardheader/>
      <div className="flex">
        <Dashboard />
        <section className="flex min-h-screen flex-1 flex-col pt-20">
          <div className="w-full h-full relative"><HomePage/></div>
        </section>
      </div>
      </main>

      
    },
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
