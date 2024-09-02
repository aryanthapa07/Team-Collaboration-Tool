// import React from 'react'
import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import TaskBar from "../components/taskbar";
import { LuFileCode2 } from "react-icons/lu";
import Hamburgercloseicon from "../icons/Hamburgerclose";
import Hamburgericon from "../icons/Hamburgericon";
import Createplusicon from "../icons/createplusicon";
import HamburgerButton from "../buttons/HamburgerButton";
import CreatebuttonHamburger from "../buttons/CreatebuttonHamburger";
import Authbuttons from "./Authbuttons";
// renders the hamburger menu for mobile view
function Hamburger() {
  // state for toggling hamburger menu
  const [toggleMenu, setToggleMenu] = useState(false);
  //state for showing taskbar on clicking create+ button in sidebar
  const [showTaskBar, setShowTaskBar] = useState(false);
  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };
  const handleTaskbar = () => {
    setShowTaskBar(!showTaskBar);
  };
  return (
    <div>
      <button className="md:hidden mr-4" onClick={handleToggleMenu}>
        {toggleMenu ? <Hamburgercloseicon /> : <Hamburgericon />}
      </button>
      {toggleMenu && (
        <div className="md:hidden absolute border border-gray-300 top-8 right-6 bg-white flex flex-col items-start justify-start w-[264px] px-4 py-6 rounded-lg">
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
            <Authbuttons />
          </div>
        </div>
      )}
    </div>
  );
}

export default Hamburger;
