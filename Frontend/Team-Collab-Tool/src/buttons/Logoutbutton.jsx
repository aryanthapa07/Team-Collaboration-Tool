// import React from 'react';
import { MdOutlineLogout } from "react-icons/md";
const Logoutbutton = ({ onClick, collapseSidebar }) => {
  return (
    <button
      onClick={onClick}
      className="text-white rounded-lg pl-4 flex gap-4 text-xl bg-[#12aef5] hover:px-4 py-2 hover:opacity-80"
    >
      <MdOutlineLogout className="my-1" />
      <span className={`${collapseSidebar && "hidden"}`}>Logout</span>
    </button>
  );
};

export default Logoutbutton;
