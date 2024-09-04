import { useState } from "react";
import { useFetchWorkspacesQuery } from "../services/WorkspaceApi";
import WorkspaceCard from "../shared/WorkspaceCard";
import WorkspaceForm from "../shared/WorkspaceForm";
const WorkspaceManager = () => {
  const {
    data: workspaces,
    error,
    isLoading,
    refetch,
  } = useFetchWorkspacesQuery();
  const [showForm, setShowForm] = useState(false);

  const handleCloseForm = () => {
    setShowForm(false);
    refetch(); // Re-fetch workspaces when the form is closed after an action
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading workspaces</div>;

  return (
    <div className="size-full gap-2 px-4">
      <div>
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-600 pt-3">
          Your Workspace
        </h2>
      </div>
      <div className="mb-4">
        <button
          className="bg-[#12aef5] hover:opacity-80 text-white px-4 py-2 font-bold rounded"
          onClick={() => setShowForm(true)}
        >
          Create Workspace
        </button>
      </div>
      {showForm && <WorkspaceForm onClose={handleCloseForm} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
