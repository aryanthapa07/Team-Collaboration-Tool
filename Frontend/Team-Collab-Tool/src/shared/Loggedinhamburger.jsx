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
  // getting the access token of the user to show user data dynamically in the hamburger
  const [toggleMenu, setToggleMenu] = useState(false);
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
        <div className="md:hidden absolute border border-gray-300 top-8 right-6 bg-white flex flex-col items-start justify-start w-[264px] px-4 py-6 rounded-lg">
          <Greetings />
          <HamburgerButton Icon={IoHomeOutline} label="Home" />
          <HamburgerButton Icon={MdOutlineTaskAlt} label="My Tasks" />
          <HamburgerButton Icon={GoGoal} label="Goals" />
          <HamburgerButton Icon={RiTeamLine} label="My Teams" />
          <HamburgerButton Icon={LuFileCode2} label="My Projects" />
          <CreatebuttonHamburger
            isActive={showTaskBar}
            onClick={handleTaskbar}
            text="Create"
            Icon={Createplusicon}
          />
          {showTaskBar && <TaskBar />}

          <div className="flex items-center justify-center gap-2 mt-4 w-full">
            <AuthButton text="Logout" onClick={handleLogout} />
          </div>
        </div>
      )}
      <div className="hidden md:flex gap-4 px-7">
        <Greetings />
      </div>
    </>
  );
}

export default Loggedinhamburger;
