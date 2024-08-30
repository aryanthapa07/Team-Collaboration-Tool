import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import { useState } from "react";
import TaskBar from "./taskbar";
import { LuFileCode2 } from "react-icons/lu";
import {  removeToken } from "../services/LocalStorageService";
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
const Dashboard = () => {
  const [showTaskBar, setShowTaskBar] = useState(false);
  const [collapseSidebar, setCollapseSidebar] = useState(true);
  const handleTaskbar = () => {
    setShowTaskBar(!showTaskBar);
  };
  const handleCollapse = () => {
    setCollapseSidebar((prev) => !prev);
  };
  const handleLogout=()=>{
    console.log("logout clicked")
    removeToken()
    navigate('/login')
}
const navigate = useNavigate()
  return (
    <div className={`relative bg-white left-0 top-0 flex h-screen flex-col justify-start gap-5 p-6 pt-24 w-full max-md:hidden ${collapseSidebar ? "max-w-fit" : "max-w-[264px]"} shadow-md`}>
      <button onClick={handleCollapse} className="absolute bottom-[50%] -right-5 bg-[#12aef5] text-white rounded-full p-2 hover:scale-110">
        {collapseSidebar ? (
         <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         strokeWidth={1.5}
         stroke="currentColor"
         className="size-6"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           d="m8.25 4.5 7.5 7.5-7.5 7.5"
         />
       </svg>
        ) :  <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>}
      </button>
      <button className="rounded-lg pl-4 flex gap-4  mt-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
        <IoHomeOutline className="my-1" /> <h3 className={`${collapseSidebar && "hidden"}`}>Home</h3>
      </button>
      <button className="rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
        <MdOutlineTaskAlt className="my-1" /> <h3 className={`${collapseSidebar && "hidden"}`}>My Tasks</h3>
      </button>
      <button className="rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
        <GoGoal className="my-1" /> <h3 className={`${collapseSidebar && "hidden"}`}>Goals</h3>
      </button>
      <button className="rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
        <RiTeamLine className="my-1" /> <h3 className={`${collapseSidebar && "hidden"}`}>My Teams</h3>
      </button>
      <button className="rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
        <LuFileCode2 className="my-1" /> <h3 className={`${collapseSidebar && "hidden"}`}>My Projects</h3>
      </button>
      <button onClick={handleLogout} className="text-white rounded-lg pl-4 flex gap-4 text-xl bg-[#12aef5] hover:px-4 py-2 hover:opacity-80" >
        <MdOutlineLogout className="my-1" /> <h3 className={`${collapseSidebar && "hidden"}`}>Logout</h3>
      </button>

{!collapseSidebar && <div className="flex flex-col gap-2.5 items-center justify-center">
      <button
        className={`border border-gray-400 py-2.5 ${
          showTaskBar
          ? "bg-[#12aef5] text-white"
          : "hover:bg-[#12aef5] hover:text-white"
        } rounded-xl mx-auto w-[85%] mt-4 flex items-center justify-center gap-1`}
        onClick={handleTaskbar}
        >
        <span className="text-lg">Create</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
            />
        </svg>
      </button>
      {showTaskBar && <TaskBar />}
            </div>}
    </div>
  );
};

export default Dashboard;
