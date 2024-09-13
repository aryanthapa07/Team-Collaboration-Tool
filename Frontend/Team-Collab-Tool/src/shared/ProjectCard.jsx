import { useState } from "react";
import { useDeleteProjectMutation } from "../services/ProjectsApi";
import ProjectForm from "./ProjectForm";
import ConfirmationDialog from "./ConfirmationDialog";
import { toast, Toaster } from "react-hot-toast";

const ProjectCard = ({ project, onActionComplete }) => {
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleteProject] = useDeleteProjectMutation();

  const handleEdit = () => {
    setShowForm(true);
  };

  const handleDelete = async () => {
    const res = await deleteProject(project.id);
    if (res.error) {
      toast.error(res.error.data.detail);
    }
    if (!res.error) {
      onActionComplete();
      toast.success("Project Deleted")
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

  return (
    <div className="cardStyle ">
      <Toaster position="top-center" reverseOrder={false} />
      <h3 className="cardName">{project.name}</h3>
      <p className="cardFields">Project ID: {project.id}</p>
      <p className="cardFields">Workspace: {project.workspace_name}</p>

      <div className="flex justify-end space-x-2">
        <button className="cardBlueButton" onClick={handleEdit}>
          Edit
        </button>

        <button className="cardRedButton" onClick={openConfirmDialog}>
          Delete
        </button>
      </div>

      {showForm && (
        <ProjectForm initialData={project} onClose={handleCloseForm} />
      )}

      {showConfirmDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this project?"
          onConfirm={confirmDelete}
          onCancel={closeConfirmDialog}
        />
      )}
    </div>
  );
};

export default ProjectCard;
