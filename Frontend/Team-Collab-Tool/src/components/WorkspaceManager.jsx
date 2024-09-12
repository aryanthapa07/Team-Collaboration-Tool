import { useState, useEffect } from "react";
import { useFetchWorkspacesQuery } from "../services/WorkspaceApi";
import WorkspaceCard from "../shared/WorkspaceCard";
import WorkspaceForm from "../shared/WorkspaceForm";
import { getToken } from "../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../services/UserAuthApi";
const WorkspaceManager = () => {
  const { access_token } = getToken();
  const {data:userData}=useGetLoggedUserQuery(access_token);
  const [showForm, setShowForm] = useState(false);
  const {
    data: workspaces,
    error,
    isLoading,
    refetch,
  } = useFetchWorkspacesQuery();

  useEffect(() => {
    if (access_token) {
      refetch(); // Refetch workspaces when access_token changes
    }
  }, [access_token, refetch]);

  const handleCloseForm = () => {
    setShowForm(false);
    refetch(); // Re-fetch workspaces when the form is closed after an action
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading workspaces</div>;

  return (
    <div className="size-full gap-2 px-4">
      <div>
        <h2 className="headingStyle">{userData?.is_admin?"Workspace":"Your Workspace"}</h2>
      </div>
      <div className="mb-4">
        <button className="bluebutton" onClick={() => setShowForm(true)}>
          Create Workspace
        </button>
      </div>
      {showForm && <WorkspaceForm onClose={handleCloseForm} />}
      <div className="cardGrid">
        {workspaces.map((workspace) => (
          <WorkspaceCard
            key={workspace.id}
            workspace={workspace}
            onActionComplete={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkspaceManager;
