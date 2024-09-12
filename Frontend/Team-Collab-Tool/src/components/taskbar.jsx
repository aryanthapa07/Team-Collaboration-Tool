import { useNavigate } from "react-router-dom";
import WorkspaceForm from "../shared/WorkspaceForm";
import ProjectForm from "../shared/ProjectForm";
import { useState } from "react";
import { useFetchWorkspacesQuery } from "../services/WorkspaceApi";
const TaskBar = () => {
  const [showWorkspaceForm, setShowWorkspaceForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const navigate = useNavigate();

  const { refetch } = useFetchWorkspacesQuery();

  const handleCloseWorkspaceForm = () => {
    navigate("/workspaces");
    setShowWorkspaceForm(false);
    refetch();
  };

  const handleCloseProjectForm = () => {
    navigate("/projects");
    setShowWorkspaceForm(false);
    refetch();
  };
  return (
    <div className="taskBarContainer">
      <button
        className="taskBarButton"
        onClick={() => setShowWorkspaceForm(true)}
      >
        Create Workspace
      </button>

      {showWorkspaceForm && (
        <WorkspaceForm onClose={handleCloseWorkspaceForm} />
      )}

      <button
        className="taskBarButton"
        onClick={() => setShowProjectForm(true)}
      >
        Create Project
      </button>

      {showProjectForm && <ProjectForm onClose={handleCloseProjectForm} />}
    </div>
  );
};

export default TaskBar;
