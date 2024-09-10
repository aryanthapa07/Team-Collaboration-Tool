import { useState } from "react";
import TaskForm from "./TaskForm";
import { useDeleteTaskMutation } from "../services/TasksApi";
import ConfirmationDialog from "./ConfirmationDialog"; // optional for delete confirmation
import { GrInProgress } from "react-icons/gr";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdDoneOutline } from "react-icons/md";

const TaskCard = ({ task, onActionComplete }) => {
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();

  const handleEdit = () => {
    setShowForm(true);
  };

  const handleDelete = async () => {
    const res = await deleteTask(task.id);
    if (!res.error) {
      onActionComplete();
    }
  };

  const openConfirmDialog = () => {
    setShowConfirmDialog(true);
  };

  const closeConfirmDialog = () => {
    setShowConfirmDialog(false);
  };

  const confirmDelete = () => {
    handleDelete();
    closeConfirmDialog();
  };

  const handleCloseForm = () => {
    setShowForm(false);
    onActionComplete();
  };

  // Determine the background color and icon based on the status
  const statusDetails = {
    pending: {
      color: "bg-red-500",
      icon: <FaClockRotateLeft />,
    },
    in_progress: {
      color: "bg-orange-400",
      icon: <GrInProgress />,
    },
    completed: {
      color: "bg-green-500",
      icon: <MdDoneOutline />,
    },
  };

  const { color: statusClass, icon } = statusDetails[task.status] || {
    color: "bg-gray-200",
    icon: null,
  };

  return (
    <div className="cardStyle flex flex-col">
      <div>
        <h3 className="cardName">{task.title}</h3>
      </div>
      <div>
        <p className="cardFields">{task.description}</p>
        <p className="cardFields">Assigned To: {task.assigned_user}</p>
        <p className="cardFields">Deadline: {task.deadline}</p>
        <p className="cardFields">Project: {task.project}</p>
      </div>

      <div className="flex justify-between space-x-2">
        <span
          className={`px-4 py-2 rounded ${statusClass} text-white flex items-center gap-1`}
        >
          {icon}
          {task.status}
        </span>
        <div className="flex gap-2">
          <button className="cardBlueButton" onClick={handleEdit}>
            Edit
          </button>
          <button className="cardRedButton" onClick={openConfirmDialog}>
            Delete
          </button>
        </div>
      </div>

      {showForm && <TaskForm initialData={task} onClose={handleCloseForm} />}

      {showConfirmDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this task?"
          onConfirm={confirmDelete}
          onCancel={closeConfirmDialog}
        />
      )}
    </div>
  );
};

export default TaskCard;
