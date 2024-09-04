// projectsmanager.jsx
import { useState } from "react";
import { useFetchProjectsQuery } from "../services/ProjectsApi";
import ProjectCard from "../shared/ProjectCard";
import ProjectForm from "../shared/ProjectForm";

const ProjectsManager = () => {
  const { data: projects, error, isLoading, refetch } = useFetchProjectsQuery();
  const [showForm, setShowForm] = useState(false);

  const handleCloseForm = () => {
    setShowForm(false);
    refetch(); // Trigger a refetch to get the updated projects list
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Projects</div>;

  return (
    <div className="size-full gap-2 px-4">
      <div>
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-600 pt-3">
          Your Projects
        </h2>
      </div>
      <div className="mb-4">
        <button
          className="bg-[#12aef5] hover:opacity-80 text-white px-4 py-2 font-bold rounded"
          onClick={() => setShowForm(true)}
        >
          Create Project
        </button>
      </div>
      {showForm && <ProjectForm onClose={handleCloseForm} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onActionComplete={refetch} // Refetch projects after action
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;
