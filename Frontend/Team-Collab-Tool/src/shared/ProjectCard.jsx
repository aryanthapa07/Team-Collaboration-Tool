import { useState } from "react";
import { useDeleteProjectMutation } from "../services/ProjectsApi";
import ProjectForm from "./ProjectForm";

const ProjectCard = ({ project, onActionComplete }) => {
  const [showForm, setShowForm] = useState(false);
  const [deleteProject] = useDeleteProjectMutation();

  const handleEdit = () => {
    setShowForm(true);
  };
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const res = await deleteProject(project.id);
      if (!res.error) {
        onActionComplete();
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    onActionComplete();
  };
  return (
    <div className="cardStyle ">
      <h3 className="cardName">{project.name}</h3>
      <p className="cardFields">Project ID:{project.id}</p>
      <p className="cardFields">Workspace ID: {project.workspace}</p>
      <div className="flex justify-end space-x-2">
        <button className="cardBlueButton" onClick={handleEdit}>
          Edit
        </button>
        <button className="cardRedButton" onClick={handleDelete}>
          Delete
        </button>
      </div>
      {showForm && (
        <ProjectForm initialData={project} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default ProjectCard;
