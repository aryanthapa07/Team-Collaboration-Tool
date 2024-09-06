import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import { useState } from "react";
import { LuFileCode2 } from "react-icons/lu";
import Opensidebar from "../icons/Opensidebar";
import Closesidebar from "../icons/Closesidebar";
import Createplusicon from "../icons/createplusicon";
import ToggleSidebarButton from "../buttons/ToggleSidebarButton";
import Sidebarbutton from "../buttons/Sidebarbutton";
import CreateButton from "../buttons/CreateButton";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [collapseSidebar, setCollapseSidebar] = useState(true);

  // statemanagement for the collapsesidebar
  const handleCollapse = () => {
    setCollapseSidebar((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate("/login");
  };

  return (
    <div
      className={`bg-white relative left-0 top-0 flex h-screen flex-col justify-start gap-5 p-6 pt-24 w-full max-md:hidden ${
        collapseSidebar ? "max-w-fit" : "max-w-[264px]"
      } shadow-md`}
    >
      <ToggleSidebarButton
        onClick={handleCollapse}
        collapseSidebar={collapseSidebar}
        OpenIcon={Opensidebar}
        CloseIcon={Closesidebar}
      />

      <Sidebarbutton
        icon={IoHomeOutline}
        label="Home"
        collapseSidebar={collapseSidebar}
        onClick={handleOnclick}
      />
      <Sidebarbutton
        icon={MdOutlineTaskAlt}
        label="My Tasks"
        collapseSidebar={collapseSidebar}
        onClick={handleOnclick}
      />
      <Sidebarbutton
        icon={GoGoal}
        label="Goals"
        collapseSidebar={collapseSidebar}
        onClick={handleOnclick}
      />
      <Sidebarbutton
        icon={RiTeamLine}
        label="My Workspace"
        collapseSidebar={collapseSidebar}
        onClick={handleOnclick}
      />
      <Sidebarbutton
        icon={LuFileCode2}
        label="My Projects"
        collapseSidebar={collapseSidebar}
        onClick={handleOnclick}
      />
      <CreateButton
        onClick={handleOnclick}
        collapseSidebar={collapseSidebar}
        Icon={Createplusicon}
        label="Create"
      />
    </div>
  );
};

export default Sidebar;
