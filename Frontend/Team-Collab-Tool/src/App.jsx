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
      <>
      <Header/>
      <Sidebar/>
      <HomePage/>
      </>
    },
    {
      path:"/login",
      element:<><Header/><LoginPage/></>
    },
    {
      path:"/signup",
      element:<><Header/><SignupPage/></>
    },
    {
      path:"/reset-password",
      element:<><Header/><Forgetpass/></>
    },
    {
      path:"/Dashboard",
      element:<><Dashboardheader/><Dashboard/><HomePage/></>
    },
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
