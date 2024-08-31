// import React from 'react'
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import { LuFileCode2 } from "react-icons/lu";
import { getToken } from "../services/LocalStorageService";
import { removeToken } from "../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { useEffect } from "react";
import { useState } from "react";
import TaskBar from "../components/taskbar";
import { useNavigate } from "react-router-dom";
import Hamburgericon from "../icons/Hamburgericon";
import Hamburgercloseicon from "../icons/Hamburgerclose";
import Createplusicon from "../icons/createplusicon";

// renders the after login hamburger for the user
function Loggedinhamburger() {
  // getting the access token of the user to show user data dynamically in the hamburger
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const [userData, setUserData] = useState({
    email: "",
    name: "",
  });
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.email,
        name: data.name,
      });
    }
  }, [data, isSuccess]);
  console.log(data);
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
          <h1 className="text-[#12aef5] font-bold px-7 py-2 text-xl">
            Hi {userData.name}
          </h1>
          <button className="w-full rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
            <IoHomeOutline className="my-1" /> <span className="">Home</span>
          </button>
          <button className="w-full rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
            <MdOutlineTaskAlt className="my-1" />{" "}
            <span className="">My Tasks</span>
          </button>
          <button className="w-full rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
            <GoGoal className="my-1" /> <span className="">Goals</span>
          </button>
          <button className="w-full rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
            <RiTeamLine className="my-1" /> <span className="">My Teams</span>
          </button>
          <button className="w-full rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2">
            <LuFileCode2 className="my-1" />{" "}
            <span className="">My Projects</span>
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
            <Createplusicon />
          </button>
          {showTaskBar && <TaskBar />}

          <div className="flex items-center justify-center gap-2 mt-4 w-full">
            <Link to="/login">
              <button
                onClick={handleLogout}
                className="hover:opacity-80 transition-all duration-400 text-white cursor-pointer bg-[#12aef5] w-full px-10 py-2 rounded-md text-lg"
              >
                Logout
              </button>
            </Link>
          </div>
        </div>
      )}
      <div className="hidden md:flex gap-4 px-7">
        <h1 className="text-[#12aef5] font-bold px-7 py-2 text-xl">
          Hi {userData.name}
        </h1>
      </div>
    </>
  );
}

export default Loggedinhamburger;
