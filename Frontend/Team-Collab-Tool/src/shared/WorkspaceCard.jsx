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
    <div className="bg-white shadow-md rounded-lg p-3 mb-3 hover:cursor-pointer ">
      <h3 className="text-xl font-bold mb-2">{workspace.name}</h3>
      <p className="text-gray-600 mb-2">Workspace ID:{workspace.id}</p>
      <p className="text-gray-600 mb-2">Owner ID: {workspace.owner}</p>
      <p className="text-gray-600 mb-4">
        Members ID: {workspace.members.join(", ")}
      </p>
      <div className="flex justify-end space-x-2">
        <button
          className="bg-[#12aef5] hover:opacity-80 text-white px-4 py-2 rounded"
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
