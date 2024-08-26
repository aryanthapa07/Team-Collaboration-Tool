import Header from "./components/header"
import Sidebar from "./components/sidebar"
import HomePage from "./components/homepage"
import LoginPage from "./components/loginpage"
import SignupPage from "./components/signuppage"
// import SignupPage from "./components/signuppage"
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
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
