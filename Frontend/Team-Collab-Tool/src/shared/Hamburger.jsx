// import React from 'react'
import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import { LuFileCode2 } from "react-icons/lu";
import Hamburgercloseicon from "../icons/Hamburgerclose";
import Hamburgericon from "../icons/Hamburgericon";
import Createplusicon from "../icons/createplusicon";
import HamburgerButton from "../buttons/HamburgerButton";
import CreatebuttonHamburger from "../buttons/CreatebuttonHamburger";
import Authbuttons from "./Authbuttons";
import { useNavigate } from "react-router-dom";
// renders the hamburger menu for mobile view
function Hamburger() {
  // state for toggling hamburger menu
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };
  const handleOnclick = () => {
    navigate("/login");
  };
  return (
    <div>
      <button className="md:hidden mr-4" onClick={handleToggleMenu}>
        {toggleMenu ? <Hamburgercloseicon /> : <Hamburgericon />}
      </button>

      {toggleMenu && (
        <div className="hamburgerStyle">
          <HamburgerButton
            Icon={IoHomeOutline}
            label="Home"
            onClick={handleOnclick}
          />
          <HamburgerButton
            Icon={MdOutlineTaskAlt}
            label="My Tasks"
            onClick={handleOnclick}
          />
          <HamburgerButton
            Icon={GoGoal}
            label="Goals"
            onClick={handleOnclick}
          />
          <HamburgerButton
            Icon={RiTeamLine}
            label="My Workspace"
            onClick={handleOnclick}
          />
          <HamburgerButton
            Icon={LuFileCode2}
            label="My Projects"
            onClick={handleOnclick}
          />
          <CreatebuttonHamburger
            onClick={handleOnclick}
            text="Create"
            Icon={Createplusicon}
          />

          <div className="authButtonsContainer">
            <Authbuttons />
          </div>
        </div>
      )}
    </div>
  );
}

export default Hamburger;
