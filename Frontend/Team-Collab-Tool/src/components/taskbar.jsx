const TaskBar = () => {
  return (
    <div className="bg-blue-900 p-3 rounded-lg shadow-md flex flex-col items-center gap-2">
      <button className="bg-blue-700 text-white px-4 py-2 rounded-md w-full hover:bg-blue-500">Create Team</button>
      <button className="bg-blue-700 text-white px-4 py-2 rounded-md w-full hover:bg-blue-500">Create Project</button>
    </div>
  );
};

export default TaskBar;