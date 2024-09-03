import { useState } from "react";
import { useDeleteWorkspaceMutation } from "../services/WorkspaceApi";
import WorkspaceForm from "./WorkspaceForm";

const WorkspaceCard = ({ workspace, onActionComplete }) => {
  const [showForm, setShowForm] = useState(false);
  const [deleteWorkspace] = useDeleteWorkspaceMutation();

  const handleEdit = () => {
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this workspace?")) {
      const res = await deleteWorkspace(workspace.id);
      if (!res.error) {
        onActionComplete(); // Refetch after deletion
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    onActionComplete(); // Refetch after editing
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">{workspace.name}</h3>
      <p className="text-gray-600 mb-2">
        Created At: {new Date(workspace.created_at).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-2">Owner ID: {workspace.owner}</p>
      <p className="text-gray-600 mb-4">
        Members: {workspace.members.join(", ")}
      </p>
      <div className="flex justify-end space-x-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      {showForm && (
        <WorkspaceForm initialData={workspace} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default WorkspaceCard;
