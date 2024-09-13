import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { LuFileCode2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Hamburgercloseicon from "../icons/Hamburgerclose";
import Hamburgericon from "../icons/Hamburgericon";
import HamburgerButton from "../buttons/HamburgerButton";
import Authbuttons from "./Authbuttons";
import AuthButton from "../buttons/AuthButton";
import Greetings from "./Greetings";
import { removeToken } from "../services/LocalStorageService";
import { getToken } from "../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../services/UserAuthApi";
import { GrUserSettings } from "react-icons/gr";

function Hamburger({ isLoggedIn }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const { access_token } = getToken();
  const { data: userData } = useGetLoggedUserQuery(access_token);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  const handleOnclick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const homeNavigate = () => {
    navigate("/dashboard");
  };

  const taskNavigate = () => {
    navigate("/tasks");
  };

  const usersnavigate = () => {
    navigate("/users");
  };

  const workspaceNavigate = () => {
    navigate("/workspaces");
  };

  const projectNavigate = () => {
    navigate("/projects");
  };

  const reportnavigate = () => {
    navigate("/report");
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
            onClick={!isLoggedIn ? handleOnclick : homeNavigate}
          />
          <HamburgerButton
            Icon={MdOutlineTaskAlt}
            label={userData?.is_admin ? "Tasks" : "My Tasks"}
            onClick={!isLoggedIn ? handleOnclick : taskNavigate}
          />
          {userData?.is_admin && (
            <HamburgerButton
              Icon={GrUserSettings}
              label="Users"
              onClick={usersnavigate}
            />
          )}

          <HamburgerButton
            Icon={RiTeamLine}
            label={userData?.is_admin ? "Workspace" : "My Workspace"}
            onClick={!isLoggedIn ? handleOnclick : workspaceNavigate}
          />
          <HamburgerButton
            Icon={LuFileCode2}
            label={userData?.is_admin ? "Projects" : "My Projects"}
            onClick={!isLoggedIn ? handleOnclick : projectNavigate}
          />

          {userData?.is_admin && (
            <HamburgerButton
              Icon={LuFileCode2}
              label="Task Report"
              onClick={reportnavigate}
            />
          )}

          <div
            className={
              isLoggedIn ? "logoutButtonContainer" : "authButtonsContainer"
            }
          >
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
