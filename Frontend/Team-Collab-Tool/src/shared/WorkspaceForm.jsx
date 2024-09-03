import { useForm } from "react-hook-form";
import {
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
} from "../services/WorkspaceApi";
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { toast, Toaster } from "react-hot-toast";

const WorkspaceForm = ({ onClose, initialData }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialData || {},
  });

  const [createWorkspace] = useCreateWorkspaceMutation();
  const [updateWorkspace] = useUpdateWorkspaceMutation();
  const [server_error, setServerError] = useState({});

  useEffect(() => {
    if (initialData && initialData.members) {
      setValue("members", initialData.members.join(", "));
    }
  }, [initialData, setValue]);

  const onSubmit = async (data) => {
    const actualData = {
      name: data.name,
      description: data.description,
      owner: data.owner ? Number(data.owner) : "",
      members:
        typeof data.members === "string"
          ? data.members.split(",").map(Number)
          : [],
    };

    let res;
    if (initialData) {
      res = await updateWorkspace({ id: initialData.id, ...actualData });
    } else {
      res = await createWorkspace(actualData);
    }

    if (res.error) {
      setServerError(res.error.data);
    }
    if (res.data) {
      toast.success("Workspace " + (initialData ? "Updated" : "Created"));
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Edit Workspace" : "Add New Workspace"}
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
              {...register("name")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="text"
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
              htmlFor="owner"
              className="block text-sm font-medium text-gray-700"
            >
              Owner
            </label>
            <input
              id="owner"
              {...register("owner")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="text"
              data-tooltip-id="owner-tooltip"
              data-tooltip-content={
                server_error.owner ? server_error.owner[0] : ""
              }
            />
            <Tooltip id="owner-tooltip" />
          </div>
          <div>
            <label
              htmlFor="members"
              className="block text-sm font-medium text-gray-700"
            >
              Members
            </label>
            <input
              id="members"
              {...register("members")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="text"
              data-tooltip-id="member-tooltip"
              data-tooltip-content={
                server_error.members ? server_error.members[0] : ""
              }
            />
            <Tooltip id="member-tooltip" />
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

export default WorkspaceForm;
