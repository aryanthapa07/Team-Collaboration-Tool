import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import { useState } from "react";
import TaskBar from "./taskbar";
import { LuFileCode2 } from "react-icons/lu";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showTaskBar, setShowTaskBar] = useState(false);
  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  const handleTaskbar = () => {
    setShowTaskBar(!showTaskBar);
  };
  return (
    <div className="flex bg-white justify-between items-center fixed z-40 top-0 left-0 w-full shadow-sm py-1">
      <Link to="/" className="hover:scale-95 transition-all duration-500">
      <img src="/images/logo.png" className="w-60 object-cover ml-4" alt="" />
      </Link>
      <div className="relative">
        <button className="md:hidden mr-4" onClick={handleToggleMenu}>
          {toggleMenu ? (
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
        {toggleMenu && (
          <div className="md:hidden absolute border border-gray-300 top-8 right-6 bg-white flex flex-col items-start justify-start w-[264px] px-4 py-6 rounded-lg">

              <button className="w-full rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
                <IoHomeOutline className="my-1" /> <h3 className="">Home</h3>
              </button>
              <button className="w-full rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
                <MdOutlineTaskAlt className="my-1" />{" "}
                <h3 className="">My Tasks</h3>
              </button>
              <button className="w-full rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
                <GoGoal className="my-1" /> <h3 className="">Goals</h3>
              </button>
              <button className="w-full rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
                <RiTeamLine className="my-1" /> <h3 className="">My Teams</h3>
              </button>
              <button className="w-full rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
                <LuFileCode2 className="my-1" />{" "}
                <h3 className="">My Projects</h3>
              </button>

              <button
                className={`border border-gray-400 py-2.5 mb-4 ${
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

              <div className="flex items-center justify-center gap-2 mt-4 w-full">
            <Link to="/login">
            <button className="hover:opacity-80 transition-all duration-400 text-white cursor-pointer bg-[#12aef5] w-full px-4 py-2 rounded-md text-lg">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="hover:opacity-80 transition-all duration-400 text-white cursor-pointer bg-[#12aef5] w-full px-4 py-2 rounded-md text-lg">
              Signup
            </button>
          </Link>
            </div>
            </div>
      
        )}
        <div className="hidden md:flex gap-4 px-7">
          <Link to="/login">
            <button className="hover:opacity-80 transition-all duration-400 text-white cursor-pointer bg-[#12aef5] px-4 py-2 rounded-md text-lg">
              Login{" "}
            </button>
          </Link>
          <Link to="/signup">
            <button className="hover:opacity-80 transition-all duration-400 text-white cursor-pointer bg-[#12aef5] px-4 py-2 rounded-md text-lg">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
