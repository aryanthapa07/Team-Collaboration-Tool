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
    <div className="bg-white shadow-md rounded-lg p-3 mb-3 hover:cursor-pointer ">
      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
      <p className="text-gray-600 mb-2">Project ID:{project.id}</p>
      <p className="text-gray-600 mb-2">Workspace ID: {project.workspace}</p>
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
      {showForm && (<ProjectForm initialData={project} onClose={handleCloseForm}/>)}
    </div>
  );
};

export default ProjectCard;
