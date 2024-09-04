import Startpage from "./pages/Startpage";
import Login from "./pages/Login";
import Registrationpage from "./pages/Registrationpage";
import Resetpassword from "./pages/Resetpasswordemail";
import Loggedinpage from "./pages/Loggedinpage";
import Resetpasswordpage from "./pages/Resetpasswordpage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WorkspacePage from "./pages/WorkspacePage";
import ProjectsPage from "./pages/ProjectsPage";
import PrivateRoute from "./pages/PrivateRoute";
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
      element: <PrivateRoute element={<Loggedinpage />} />,
    },
    {
      path: "/reset-password/:id/:token",
      element: <Resetpasswordpage />,
    },
    {
      path: "/workspaces",
      element: <PrivateRoute element={<WorkspacePage />} />,
    },
    {
      path: "/projects",
      element: <PrivateRoute element={<ProjectsPage />} />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
