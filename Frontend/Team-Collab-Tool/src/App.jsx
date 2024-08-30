import Startpage from "./pages/Startpage";
import Login from "./pages/Login";
import Registrationpage from "./pages/Registrationpage";
import Resetpassword from "./pages/resetpassword";
import Loggedinpage from "./pages/Loggedinpage";
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
      path: "/reset-password",
      element: <Resetpassword />,
    },
    {
      path: "/dashboard",
      element: <Loggedinpage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
