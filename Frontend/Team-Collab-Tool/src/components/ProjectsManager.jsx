// projectsmanager.jsx
import { useState, useEffect } from "react";
import { useFetchProjectsQuery } from "../services/ProjectsApi";
import ProjectCard from "../shared/ProjectCard";
import ProjectForm from "../shared/ProjectForm";
import { getToken } from "../services/LocalStorageService";

const ProjectsManager = () => {
  const { access_token } = getToken();
  const { data: projects, error, isLoading, refetch } = useFetchProjectsQuery();
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (access_token) {
      refetch(); // Refetch projects when access_token changes
    }
  }, [access_token, refetch]);

  const handleCloseForm = () => {
    setShowForm(false);
    refetch(); // Trigger a refetch to get the updated projects list
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Projects</div>;

  return (
    <div className="size-full gap-2 px-4">
      <div>
        <h2 className="headingStyle">Your Projects</h2>
      </div>
      <div className="mb-4">
        <button className="bluebutton" onClick={() => setShowForm(true)}>
          Create Project
        </button>
      </div>
      {showForm && <ProjectForm onClose={handleCloseForm} />}
      <div className="cardGrid">
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
