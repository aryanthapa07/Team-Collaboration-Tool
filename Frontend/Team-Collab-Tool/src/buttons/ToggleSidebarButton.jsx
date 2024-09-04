// import React from "react";

const ToggleSidebarButton = ({
  onClick,
  collapseSidebar,
  OpenIcon,
  CloseIcon,
}) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-[50%] right-[-0.7rem] bg-[#12aef5] text-white rounded-full p-2 hover:scale-110"
    >
      {collapseSidebar ? <OpenIcon /> : <CloseIcon />}
    </button>
  );
};

export default ToggleSidebarButton;
