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
    <div className="cardStyle ">
      <h3 className="cardName">{workspace.name}</h3>
      <p className="cardFields">Workspace ID:{workspace.id}</p>
      <p className="cardFields">Owner ID: {workspace.owner}</p>
      <p className="cardFields">Members ID: {workspace.members.join(", ")}</p>

      <div className="flex justify-end space-x-2">
        <button className="cardBlueButton" onClick={handleEdit}>
          Edit
        </button>

        <button className="cardRedButton" onClick={handleDelete}>
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
