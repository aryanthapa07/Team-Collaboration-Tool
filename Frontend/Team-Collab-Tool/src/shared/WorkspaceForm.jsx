import { useForm } from "react-hook-form";
import {
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
} from "../services/WorkspaceApi";
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { toast, Toaster } from "react-hot-toast";
import { inputFields } from "../constants/InputField";

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
      }, 1000);
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
            {inputFields.map((field, index) => (
              <div key={index}>
                <span className="formLabel">{field.title}</span>
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
          </section>

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
