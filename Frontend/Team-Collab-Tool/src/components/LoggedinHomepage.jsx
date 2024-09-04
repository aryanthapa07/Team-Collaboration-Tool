import Bluebutton from "../buttons/Bluebutton";
import HomepageTexts from "../shared/HomepageTexts";
import { useNavigate } from "react-router-dom";
const LoggedinHomepage = () => {
  const navigate = useNavigate();
  const workspaceNavigate = () => {
    navigate("/workspaces");
  };
  const projectNavigate = () => {
    navigate("/projects");
  };
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 px-4">
      <HomepageTexts />
      <div className="buttons flex justify-center gap-4">
        <Bluebutton text="My Workspace" onClick={workspaceNavigate} />
        <Bluebutton text="My Projects" onClick={projectNavigate}/>
      </div>
    </div>
  );
};

export default LoggedinHomepage;
