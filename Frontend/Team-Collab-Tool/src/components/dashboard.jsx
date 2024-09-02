import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import { LuFileCode2 } from "react-icons/lu";
import { removeToken } from "../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import Logoutbutton from "../buttons/Logoutbutton";
import Opensidebar from "../icons/Opensidebar";
import Closesidebar from "../icons/Closesidebar";
import Createplusicon from "../icons/createplusicon";
import { useState } from "react";
import Sidebarbutton from "../buttons/Sidebarbutton";
import ToggleSidebarButton from "../buttons/ToggleSidebarButton";
import CreateButton from "../buttons/CreateButton";
const Dashboard = () => {
  const [showTaskBar, setShowTaskBar] = useState(false);
  const [collapseSidebar, setCollapseSidebar] = useState(true);
  const navigate = useNavigate();
  const handleTaskbar = () => {
    setShowTaskBar(!showTaskBar);
  };
  const handleCollapse = () => {
    setCollapseSidebar((prev) => !prev);
  };
  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };
  return (
    <div
      className={`relative bg-white left-0 top-0 flex h-screen flex-col justify-start gap-5 p-6 pt-24 w-full max-md:hidden ${
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
      />
      <Sidebarbutton
        icon={MdOutlineTaskAlt}
        label="My Tasks"
        collapseSidebar={collapseSidebar}
      />
      <Sidebarbutton
        icon={GoGoal}
        label="Goals"
        collapseSidebar={collapseSidebar}
      />
      <Sidebarbutton
        icon={RiTeamLine}
        label="My Teams"
        collapseSidebar={collapseSidebar}
      />
      <Sidebarbutton
        icon={LuFileCode2}
        label="My Projects"
        collapseSidebar={collapseSidebar}
      />
      <Logoutbutton onClick={handleLogout} collapseSidebar={collapseSidebar} />
      <CreateButton
        onClick={handleTaskbar}
        collapseSidebar={collapseSidebar}
        showTaskBar={showTaskBar}
        Icon={Createplusicon}
        label="Create"
      />
    </div>
  );
};

export default Dashboard;
