const TaskBar = () => {
  return (
    <div className="w-full border border-gray-400 p-3 rounded-lg flex flex-col items-center gap-2">
      <button className="hover:opacity-80 bg-[#12aef5] text-white px-4 py-2 rounded-md w-full">Create Team</button>
      <button className="hover:opacity-80 bg-[#12aef5] text-white px-4 py-2 rounded-md w-full">Create Project</button>
    </div>
  );
};

export default TaskBar;