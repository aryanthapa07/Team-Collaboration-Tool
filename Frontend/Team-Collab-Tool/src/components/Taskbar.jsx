import { useNavigate } from "react-router-dom";
import WorkspaceForm from "../shared/WorkspaceForm";
import ProjectForm from "../shared/ProjectForm";
import { useState } from "react";
import { useFetchWorkspacesQuery } from "../services/WorkspaceApi";
import { getToken } from "../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../services/UserAuthApi";

const TaskBar = () => {
  const { access_token } = getToken();
  const { data: userData } = useGetLoggedUserQuery(access_token);
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
    <div
      className={
        userData?.is_admin
          ? "fixed left-56 bottom-0 flex items-center justify-center z-40 bg-white w-[15%] m-auto "
          : "fixed left-6 bottom-24 flex items-center justify-center z-40 bg-white w-[15%] m-auto "
      }
    >
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
    </div>
  );
};

export default TaskBar;
