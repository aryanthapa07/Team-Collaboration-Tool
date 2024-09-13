// WorkspaceCard.jsx
import { useState } from "react";
import { useDeleteWorkspaceMutation } from "../services/WorkspaceApi";
import WorkspaceForm from "./WorkspaceForm";
import ConfirmationDialog from "./ConfirmationDialog";
import { toast, Toaster } from "react-hot-toast";

const WorkspaceCard = ({ workspace, onActionComplete }) => {
  const [showForm, setShowForm] = useState(false);
  const [deleteWorkspace] = useDeleteWorkspaceMutation();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleEdit = () => {
    setShowForm(true);
  };

  const handleDelete = async () => {
    const res = await deleteWorkspace(workspace.id);
    if (res.error) {
      toast.error(res.error.data.detail);
    }
    if (!res.error) {
      onActionComplete(); // Refetch after deletion
      toast.success("Workspace Deleted")
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
    onActionComplete(); // Refetch after editing
  };

  return (
    <div className="cardStyle ">
      <Toaster position="top-center" reverseOrder={false} />
      <h3 className="cardName">{workspace.name}</h3>
      {/* <p className="cardFields">Workspace ID: {workspace.id}</p> */}
      <p className="cardFields">Owner: {workspace.owner_name}</p>{" "}
      {/* Show owner's name */}
      <p className="cardFields">
        Members: {workspace.members_names.join(", ")}{" "}
        {/* Show members' names */}
      </p>
      <div className="flex justify-end space-x-2">
        <button className="cardBlueButton" onClick={handleEdit}>
          Edit
        </button>

        <button className="cardRedButton" onClick={openConfirmDialog}>
          Delete
        </button>
      </div>
      {showForm && (
        <WorkspaceForm initialData={workspace} onClose={handleCloseForm} />
      )}
      {showConfirmDialog && (
        <ConfirmationDialog
          message={"Are you sure you want to delete this workspace?"}
          onConfirm={confirmDelete}
          onCancel={closeConfirmDialog}
        />
      )}
    </div>
  );
};

export default WorkspaceCard;
