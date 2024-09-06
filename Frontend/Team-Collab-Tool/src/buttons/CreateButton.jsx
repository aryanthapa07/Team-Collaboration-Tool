// import React from "react";
import TaskBar from "../components/Taskbar";

const CreateButton = ({
  onClick,
  collapseSidebar,
  showTaskBar,
  Icon,
  label,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`border border-gray-400 py-2.5 ${
          showTaskBar
            ? "bg-[#12aef5] text-white"
            : "hover:bg-[#12aef5] hover:text-white"
        } rounded-xl mx-auto w-[85%] mt-4 flex items-center justify-center gap-1`}
      >
        {collapseSidebar ? (
          <Icon />
        ) : (
          <>
            <span className="text-lg">{label}</span>
            <Icon />
          </>
        )}
      </button>
      {!collapseSidebar && showTaskBar && <TaskBar />}
    </>
  );
};

export default CreateButton;
