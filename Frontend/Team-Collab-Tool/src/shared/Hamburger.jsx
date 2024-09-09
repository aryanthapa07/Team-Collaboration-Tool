import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import { LuFileCode2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Hamburgercloseicon from "../icons/Hamburgerclose";
import Hamburgericon from "../icons/Hamburgericon";
import Createplusicon from "../icons/createplusicon";
import HamburgerButton from "../buttons/HamburgerButton";
import CreatebuttonHamburger from "../buttons/CreatebuttonHamburger";
import Authbuttons from "./Authbuttons";
import AuthButton from "../buttons/AuthButton";
import Greetings from "./Greetings";
import TaskBar from "../components/Taskbar";
import { removeToken } from "../services/LocalStorageService";

function Hamburger({ isLoggedIn }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showTaskBar, setShowTaskBar] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  const handleOnclick = () => {
    navigate("/login");
  };

  const handleTaskbar = () => {
    setShowTaskBar(!showTaskBar);
  };

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div>
      <button className="md:hidden mr-4" onClick={handleToggleMenu}>
        {toggleMenu ? <Hamburgercloseicon /> : <Hamburgericon />}
      </button>

      {toggleMenu && (
        <div className="hamburgerStyle">
          {isLoggedIn && <Greetings />}

          <HamburgerButton
            Icon={IoHomeOutline}
            label="Home"
            onClick={!isLoggedIn ? handleOnclick : undefined}
          />
          <HamburgerButton
            Icon={MdOutlineTaskAlt}
            label="My Tasks"
            onClick={!isLoggedIn ? handleOnclick : undefined}
          />
          <HamburgerButton
            Icon={GoGoal}
            label="Goals"
            onClick={!isLoggedIn ? handleOnclick : undefined}
          />
          <HamburgerButton
            Icon={RiTeamLine}
            label="My Workspace"
            onClick={!isLoggedIn ? handleOnclick : undefined}
          />
          <HamburgerButton
            Icon={LuFileCode2}
            label="My Projects"
            onClick={!isLoggedIn ? handleOnclick : undefined}
          />

          <CreatebuttonHamburger
            isActive={showTaskBar}
            onClick={isLoggedIn ? handleTaskbar : handleOnclick}
            text="Create"
            Icon={Createplusicon}
          />

          {isLoggedIn && showTaskBar && <TaskBar />}

          <div className={isLoggedIn ? "logoutButtonContainer" : "authButtonsContainer"}>
            {isLoggedIn ? (
              <AuthButton text="Logout" onClick={handleLogout} />
            ) : (
              <Authbuttons />
            )}
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div className="greetingsContainer">
          <Greetings />
        </div>
      )}
    </div>
  );
}

export default Hamburger;
