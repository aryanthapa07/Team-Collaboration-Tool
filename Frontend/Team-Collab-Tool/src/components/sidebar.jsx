import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { LuFileCode2 } from "react-icons/lu";
import { GrUserSettings } from "react-icons/gr";
import { BsPersonWorkspace } from "react-icons/bs";
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
import { getToken } from "../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../services/UserAuthApi";
import { HiOutlineDocumentReport } from "react-icons/hi";

const Sidebar = ({ isLoggedIn }) => {
  const [collapseSidebar, setCollapseSidebar] = useState(true);
  const [showTaskBar, setShowTaskBar] = useState(false);
  const navigate = useNavigate();
  const { access_token } = getToken();
  const { data: userData } = useGetLoggedUserQuery(access_token);

  const handleCollapse = () => {
    setCollapseSidebar((prev) => !prev);
  };

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const handleTaskbar = () => {
    setShowTaskBar(!showTaskBar);
  };

  const handleOnclick = () => {
    navigate("/login");
  };

  const homepagenavigate = () => {
    navigate("/dashboard");
  };

  const workspaceNavigate = () => {
    navigate("/workspaces");
  };

  const projectNavigate = () => {
    navigate("/projects");
  };

  const taskNavigate = () => {
    navigate("/tasks");
  };

  const usersnavigate = () => {
    navigate("/users");
  };

  const reportnavigate = () => {
    navigate("/report");
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

      {/* Common Sidebar Buttons */}
      <Sidebarbutton
        icon={IoHomeOutline}
        label="Home"
        collapseSidebar={collapseSidebar}
        onClick={isLoggedIn ? homepagenavigate : handleOnclick}
      />
      <Sidebarbutton
        icon={MdOutlineTaskAlt}
        label={userData?.is_admin ? "Tasks" : "My Tasks"}
        collapseSidebar={collapseSidebar}
        onClick={isLoggedIn ? taskNavigate : handleOnclick}
      />
      {/* Conditionally render Users or Goals based on admin status */}
      {userData?.is_admin ? (
        <Sidebarbutton
          icon={GrUserSettings}
          label="Users"
          collapseSidebar={collapseSidebar}
          onClick={usersnavigate}
        />
      ) : (
        <Sidebarbutton
          icon={GoGoal}
          label="Goals"
          collapseSidebar={collapseSidebar}
          onClick={isLoggedIn ? null : handleOnclick}
        />
      )}
      <Sidebarbutton
        icon={BsPersonWorkspace}
        label={userData?.is_admin ? "Workspace" : "My Workspace"}
        collapseSidebar={collapseSidebar}
        onClick={isLoggedIn ? workspaceNavigate : handleOnclick}
      />
      <Sidebarbutton
        icon={LuFileCode2}
        label={userData?.is_admin ? "Projects" : "My Projects"}
        collapseSidebar={collapseSidebar}
        onClick={isLoggedIn ? projectNavigate : handleOnclick}
      />

      {userData?.is_admin && (
        <Sidebarbutton
          icon={HiOutlineDocumentReport}
          label="Task Report"
          collapseSidebar={collapseSidebar}
          onClick={reportnavigate}
        />
      )}

      {/* Conditional rendering based on login status */}
      {isLoggedIn && !userData?.is_admin && (
        <>
          <Logoutbutton
            onClick={handleLogout}
            collapseSidebar={collapseSidebar}
          />

          <CreateButton
            onClick={handleTaskbar}
            collapseSidebar={collapseSidebar}
            showTaskBar={showTaskBar}
            Icon={Createplusicon}
            label="Create"
          />
        </>
      )}

      {isLoggedIn && userData?.is_admin && (
        <Logoutbutton
          onClick={handleLogout}
          collapseSidebar={collapseSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
