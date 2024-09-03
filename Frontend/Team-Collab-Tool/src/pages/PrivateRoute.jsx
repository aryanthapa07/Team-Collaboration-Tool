import { Navigate } from "react-router-dom";
import { getToken } from "../services/LocalStorageService";

const PrivateRoute = ({ element: Component }) => {
  const { access_token } = getToken();

  if (!access_token) {
    // If no access token is found, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the access token is found, render the passed component
  return Component;
};

export default PrivateRoute;
