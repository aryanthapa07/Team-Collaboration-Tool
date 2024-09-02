// import React from 'react'

const Sidebarbutton = ({ icon: Icon, label, onClick, collapseSidebar }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg pl-4 flex gap-4 text-xl hover:bg-[#12aef5] hover:text-white px-4 py-2"
    >
      <Icon className="my-1" />
      <span className={`${collapseSidebar && "hidden"}`}>{label}</span>
    </button>
  );
};

export default Sidebarbutton;
