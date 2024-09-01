import Startpage from "./pages/Startpage";
import Login from "./pages/Login";
import Registrationpage from "./pages/Registrationpage";
import Resetpassword from "./pages/Resetpasswordemail";
import Loggedinpage from "./pages/Loggedinpage";
import Resetpasswordpage from "./pages/Resetpasswordpage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Startpage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Registrationpage />,
    },
    {
      path: "/reset-password-email",
      element: <Resetpassword />,
    },
    {
      path: "/dashboard",
      element: <Loggedinpage />,
    },
    {
      path: "/reset-password/:id/:token",
      element: <Resetpasswordpage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
