// projectform.jsx
import { useForm } from "react-hook-form";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../services/ProjectsApi";
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { toast, Toaster } from "react-hot-toast";

const ProjectForm = ({ onClose, initialData }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialData || {},
  });

  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [server_error, setServerError] = useState({});

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("description", initialData.description);
      setValue("workspace", initialData.workspace);
    }
  }, [initialData, setValue]);

  const onSubmit = async (data) => {
    const actualData = {
      name: data.name,
      description: data.description,
      workspace: parseInt(data.workspace), // Ensure workspace ID is an integer
    };

    let res;
    if (initialData) {
      res = await updateProject({ id: initialData.id, ...actualData });
    } else {
      res = await createProject(actualData);
    }

    if (res.error) {
      console.log("inside res.error", res);
      setServerError(res.error.data);
    }
    if (res.data) {
      console.log("inside res.data", res);
      toast.success("Project " + (initialData ? "Updated" : "Created"));
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Edit Project" : "Add New Project"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`mt-1 block w-full border ${
                server_error.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2`}
              data-tooltip-id="name-tooltip"
              data-tooltip-content={
                server_error.name ? server_error.name[0] : ""
              }
            />
            <Tooltip id="name-tooltip" />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="workspace"
              className="block text-sm font-medium text-gray-700"
            >
              Workspace ID
            </label>
            <input
              id="workspace"
              {...register("workspace")}
              className={`mt-1 block w-full border ${
                server_error.workspace ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2 `}
              type="number"
              data-tooltip-id="workspace-tooltip"
              data-tooltip-content={
                server_error.workspace ? server_error.workspace[0] : ""
              }
            />
            <Tooltip id="workspace-tooltip" />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 font-bold rounded"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-[#12aef5] hover:opacity-80 text-white px-4 py-2 font-bold rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
