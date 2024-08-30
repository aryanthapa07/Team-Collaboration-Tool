import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import { useState } from "react";
import TaskBar from "./taskbar";
import { LuFileCode2 } from "react-icons/lu";
import Opensidebar from "../icons/Opensidebar";
import Closesidebar from "../icons/Closesidebar";
import Createplusicon from "../icons/createplusicon";
const Sidebar = () => {
  const [showTaskBar, setShowTaskBar] = useState(false);
  const [collapseSidebar, setCollapseSidebar] = useState(true);
  const handleTaskbar = () => {
    setShowTaskBar(!showTaskBar);
  };
  const handleCollapse = () => {
    setCollapseSidebar((prev) => !prev);
  };
  return (
    <div
      className={`bg-white relative left-0 top-0 flex h-screen flex-col justify-start gap-5 p-6 pt-24 w-full max-md:hidden ${
        collapseSidebar ? "max-w-fit" : "max-w-[264px]"
      } shadow-md`}
    >
      <button
        onClick={handleCollapse}
        className="absolute bottom-[50%] -right-5 bg-[#12aef5] text-white rounded-full p-2 hover:scale-110"
      >
        {collapseSidebar ? <Opensidebar /> : <Closesidebar />}
      </button>

      <button className="rounded-lg pl-4 flex gap-4  mt-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
        <IoHomeOutline className="my-1" />
        <span className={`${collapseSidebar && "hidden"}`}>Home</span>
      </button>
      <button className="rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
        <MdOutlineTaskAlt className="my-1" />
        <span className={`${collapseSidebar && "hidden"}`}>My Tasks</span>
      </button>
      <button className="rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
        <GoGoal className="my-1" />
        <span className={`${collapseSidebar && "hidden"}`}>Goals</span>
      </button>
      <button className="rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
        <RiTeamLine className="my-1" />
        <span className={`${collapseSidebar && "hidden"}`}>My Teams</span>
      </button>
      <button className="rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
        <LuFileCode2 className="my-1" />
        <span className={`${collapseSidebar && "hidden"}`}>My Projects</span>
      </button>

      {!collapseSidebar && (
        <div className="flex flex-col gap-2.5 items-center justify-center">
          <button
            className={`border border-gray-400 py-2.5 ${
              showTaskBar
                ? "bg-[#12aef5] text-white"
                : "hover:bg-[#12aef5] hover:text-white"
            } rounded-xl mx-auto w-[85%] mt-4 flex items-center justify-center gap-1`}
            onClick={handleTaskbar}
          >
            <span className="text-lg">Create</span>
            <Createplusicon />
          </button>
          {showTaskBar && <TaskBar />}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
