import { useState, useEffect } from "react";
import TaskForm from "../shared/TaskForm";
import { useFetchTaskQuery } from "../services/TasksApi";
import TaskCard from "../shared/TaskCard";
import { getToken } from "../services/LocalStorageService";

const TaskManager = () => {
  const [showForm, setShowForm] = useState(false);
  const { data: tasks, refetch } = useFetchTaskQuery();
  const { access_token } = getToken();

  const handleCloseForm = () => {
    setShowForm(false);
    refetch(); // Refetch the tasks after creating/updating
  };

  useEffect(() => {
    if (access_token) {
      refetch(); // Refetch tasks when access_token changes
    }
  }, [access_token, refetch]);

  // Sorting tasks based on status
  const sortedTasks = tasks?.slice().sort((a, b) => {
    const statusOrder = {
      pending: 1,
      in_progress: 2,
      completed: 3,
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="size-full gap-2 px-4">
      <div>
        <h2 className="headingStyle">Tasks</h2>
      </div>
      <div className="mb-4">
        <button className="bluebutton" onClick={() => setShowForm(true)}>
          Create Tasks
        </button>
      </div>
      {showForm && <TaskForm onClose={handleCloseForm} />}

      <div className="cardGrid">
        {sortedTasks?.map((task) => (
          <TaskCard key={task.id} task={task} onActionComplete={refetch} />
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
