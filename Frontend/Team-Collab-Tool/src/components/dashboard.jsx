// import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import { useState } from "react";
import TaskBar from "./taskbar";
import { LuFileCode2 } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
import { removeToken } from "../services/LocalStorageService";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [showTaskBar, setShowTaskBar] = useState(false);
    const handleTaskbar=()=>{
        setShowTaskBar(!showTaskBar)
    }
    const handleLogout=()=>{
        console.log("logout clicked")
        removeToken()
        navigate('/login')
    }
    const navigate = useNavigate()
    return (
        <div className="fixed bg-blue-950 px-2 text-white h-[88.5vh] w-1/6 " >
            <button className="outline p-2 rounded-xl mx-1 my-4" id="createbutton" onClick={handleTaskbar}> + Create</button>
            {showTaskBar && <TaskBar />}
            <button className="rounded-xl mx-1 my-4 flex gap-1" id="createbutton"><IoHomeOutline className="my-1" /> <h3>Home</h3></button>
            <button className="rounded-xl mx-1 my-4 flex gap-1" id="createbutton"><MdOutlineTaskAlt className="my-1"/> <h3>My Tasks</h3></button>
            <button className="rounded-xl mx-1 my-4 flex gap-1" id="createbutton"><GoGoal className="my-1"/> <h3>Goals</h3></button>
            <button className="rounded-xl mx-1 my-4 flex gap-1" id="createbutton"><RiTeamLine className="my-1"/> <h3>My Teams</h3></button>
            <button className="rounded-xl mx-1 my-4 flex gap-1" id="createbutton"><LuFileCode2 className="my-1"/> <h3>My Projects</h3></button>
            <button onClick={handleLogout}  className="rounded-xl mx-1 my-4 flex gap-1" id="createbutton"><MdOutlineLogout className="my-1"/> <h3>Logout</h3></button>
        </div>
      )
}

export default Dashboard
