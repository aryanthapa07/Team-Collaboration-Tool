// import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import { LuFileCode2 } from "react-icons/lu";
import { removeToken } from "../services/LocalStorageService";
import { useState } from "react";
import TaskBar from "../components/taskbar";
import { useNavigate } from "react-router-dom";
import Hamburgericon from "../icons/Hamburgericon";
import Hamburgercloseicon from "../icons/Hamburgerclose";
import Createplusicon from "../icons/createplusicon";
import HamburgerButton from "../buttons/HamburgerButton";
import CreatebuttonHamburger from "../buttons/CreatebuttonHamburger";
import AuthButton from "../buttons/AuthButton";
import Greetings from "./Greetings";
// renders the after login hamburger for the user
function Loggedinhamburger() {
  const [toggleMenu, setToggleMenu] = useState(false);
  //state for showing taskbar on clicking create+ button in sidebar
  const [showTaskBar, setShowTaskBar] = useState(false);
  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };
  const handleTaskbar = () => {
    setShowTaskBar(!showTaskBar);
  };
  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };
  const navigate = useNavigate();
  return (
    <>
      <button className="md:hidden mr-4" onClick={handleToggleMenu}>
        {toggleMenu ? <Hamburgercloseicon /> : <Hamburgericon />}
      </button>
      {toggleMenu && (
        <div className="hamburgerStyle">
          <Greetings />
          <HamburgerButton Icon={IoHomeOutline} label="Home" />
          <HamburgerButton Icon={MdOutlineTaskAlt} label="My Tasks" />
          <HamburgerButton Icon={GoGoal} label="Goals" />
          <HamburgerButton Icon={RiTeamLine} label="My Workspace" />
          <HamburgerButton Icon={LuFileCode2} label="My Projects" />
          <CreatebuttonHamburger
            isActive={showTaskBar}
            onClick={handleTaskbar}
            text="Create"
            Icon={Createplusicon}
          />
          {showTaskBar && <TaskBar />}

          <div className="logoutButtonContainer">
            <AuthButton text="Logout" onClick={handleLogout} />
          </div>
        </div>
      )}
      <div className="greetingsContainer">
        <Greetings />
      </div>
    </>
  );
}

export default Loggedinhamburger;
