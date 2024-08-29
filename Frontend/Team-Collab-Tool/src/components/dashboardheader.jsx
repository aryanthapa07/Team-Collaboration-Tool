// import React from 'react'
import { FcCollaboration } from "react-icons/fc";
function Dashboardheader() {
    return (
        <div className="flex bg-blue-950 py-5 justify-between">
                <div className="text-white font-bold px-7 py-2 flex gap-1"><FcCollaboration className="size-7 "/><h1 className="my-1">CollabSpace</h1></div>
                <div className="flex gap-4 px-7">
                    <h1></h1>
                </div>
        </div>
    )
}

export default Dashboardheader
