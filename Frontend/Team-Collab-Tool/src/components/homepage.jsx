import Bluebutton from "../buttons/Bluebutton";
import HomepageTexts from "../shared/HomepageTexts";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const HandleOnClick = () => {
    navigate("/login");
  };
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 px-4">
      <HomepageTexts />
      <div className="buttons flex justify-center gap-4">
        <Bluebutton text="My Workspace" onClick={HandleOnClick} />
        <Bluebutton text="My Projects" onClick={HandleOnClick} />
      </div>
    </div>
  );
};

export default HomePage;
