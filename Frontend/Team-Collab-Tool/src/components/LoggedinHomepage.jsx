import Bluebutton from "../buttons/Bluebutton";
import HomepageTexts from "../shared/HomepageTexts";
import { useNavigate } from "react-router-dom";
import { useGetLoggedUserQuery } from "../services/UserAuthApi";
import { getToken } from "../services/LocalStorageService";
const LoggedinHomepage = () => {
  const { access_token } = getToken();
  const { data: userData } = useGetLoggedUserQuery(access_token);
  const navigate = useNavigate();
  const workspaceNavigate = () => {
    navigate("/workspaces");
  };
  const projectNavigate = () => {
    navigate("/projects");
  };
  const usersNavigate = () => {
    navigate("/users");
  };
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 px-4">
      <HomepageTexts />
      <div className="buttons flex justify-center gap-4">
        <Bluebutton
          text={userData?.is_admin ? "Manage Workspace" : "My Workspace"}
          onClick={workspaceNavigate}
        />
        <Bluebutton
          text={userData?.is_admin ? "Manage Users" : "My Projects"}
          onClick={userData?.is_admin ? usersNavigate : projectNavigate}
        />
      </div>
    </div>
  );
};

export default LoggedinHomepage;
