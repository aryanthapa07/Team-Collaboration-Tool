import { useForm } from "react-hook-form";
import {
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
} from "../services/WorkspaceApi";
import { useFetchUsersQuery } from "../services/UserAuthApi";
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { toast, Toaster } from "react-hot-toast";
import { inputFields } from "../constants/InputField";
import Select from "react-select";

const WorkspaceForm = ({ onClose, initialData }) => {
  // Setting up form management with react-hook-form
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {}, // Setting default values if editing
  });

  // Hooks for creating and updating workspaces
  const [createWorkspace] = useCreateWorkspaceMutation();
  const [updateWorkspace] = useUpdateWorkspaceMutation();

  // Hook for fetching users
  const { data: users } = useFetchUsersQuery();

  // Local state for handling server errors and selected members
  const [server_error, setServerError] = useState({});
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Effect to set selected members when initialData changes
  useEffect(() => {
    if (initialData && initialData.members && Array.isArray(initialData.members)) {
      // Ensure users is defined and has a value before using it
      if (users) {
        setSelectedMembers(
          initialData.members.map((memberId) => ({
            value: memberId,
            label: users.find((user) => user.id === memberId)?.name || "",
          }))
        );
      }
    }
  }, [initialData, users]);

  // Form submission handler
  const onSubmit = async (data) => {
    const memberIds = selectedMembers.map((member) => member.value);
    const actualData = {
      name: data.name,
      description: data.description,
      members: memberIds,
    };

    let res;
    // Decide whether to create or update based on initialData presence
    if (initialData) {
      res = await updateWorkspace({ id: initialData.id, ...actualData });
    } else {
      res = await createWorkspace(actualData);
    }

    // Handle server errors
    if (res.error) {
      setServerError(res.error.data);
      toast.error(res.error.data.detail)
    }

    // Display success message and close form on success
    if (res.data) {
      toast.success("Workspace " + (initialData ? "Updated" : "Created"));
      onClose();
    }
  };

  return (
    <div className="dropDownFormPosition">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="dropDownFormStyling">
        <h2 className="dropDownFormHeading">
          {initialData ? "Edit Workspace" : "Add New Workspace"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <section>
            {/* Rendering input fields based on inputFields array */}
            {inputFields.map((field, index) => (
              <div key={index}>
                <span className="formLabel">
                  {field.title}

                  {field.id === "description" ? (
                    <span></span>
                  ) : (
                    <span className="text-red-700">*</span>
                  )}
                </span>

                {field.id === "description" ? (
                  <textarea
                    maxLength="80"
                    id={`${field.id}`}
                    {...register(`${field.id}`)}
                    className={`mt-1 block w-full border resize-none ${
                      server_error[field.id]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm p-2`}
                    data-tooltip-id={`${field.id}-tooltip`}
                    data-tooltip-content={
                      server_error[field.id] ? server_error[field.id][0] : ""
                    }
                  />
                ) : (
                  <input
                    id={`${field.id}`}
                    {...register(`${field.id}`)}
                    className={`mt-1 block w-full border ${
                      server_error[field.id]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm p-2`}
                    type="text"
                    data-tooltip-id={`${field.id}-tooltip`}
                    data-tooltip-content={
                      server_error[field.id] ? server_error[field.id][0] : ""
                    }
                  />
                )}
                <Tooltip id={`${field.id}-tooltip`} />
              </div>
            ))}

            {/* Select component for choosing members */}
            <div>
              <label className="formLabel">
                Members<span className="text-red-700">*</span>
              </label>
              <Select
                isMulti
                options={users?.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                value={selectedMembers}
                onChange={setSelectedMembers}
              />
            </div>
          </section>

          {/* Buttons for closing the form and submitting */}
          <div className="dropDownFormButtons">
            <button type="button" onClick={onClose} className="graybutton">
              Close
            </button>

            <button type="submit" className="bluebutton">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkspaceForm;
