// projectform.jsx
import { useForm } from "react-hook-form";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../services/ProjectsApi";
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { toast, Toaster } from "react-hot-toast";
import { projectFields } from "../constants/InputField";

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
    console.log(data);
    const actualData = {
      name: data.name,
      description: data.description,
      workspace: data.workspace,
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
    <div className="dropDownFormPosition">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="dropDownFormStyling">
        <h2 className="dropDownFormHeading">
          {initialData ? "Edit Project" : "Add New Project"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <section>
            {projectFields.map((projectfield, index) => (
              <div key={index}>
                <span className="formLabel">{projectfield.title}</span>
                {projectfield.id === "description" ? (
                  <textarea
                    maxLength="80"
                    id={`${projectfield.id}`}
                    {...register(`${projectfield.id}`)}
                    className={`mt-1 block w-full border resize-none ${
                      server_error[projectfield.id]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm p-2`}
                    data-tooltip-id={`${projectfield.id}-tooltip`}
                    data-tooltip-content={
                      server_error[projectfield.id]
                        ? server_error[projectfield.id][0]
                        : ""
                    }
                  />
                ) : (
                  <input
                    id={projectfield.id}
                    type="text"
                    {...register(projectfield.id)}
                    className={`mt-1 block w-full border ${
                      server_error[projectfield.id]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm p-2`}
                    data-tooltip-id={`${projectfield.id}-tooltip`}
                    data-tooltip-content={
                      server_error[projectfield.id]
                        ? server_error[projectfield.id][0]
                        : ""
                    }
                  />
                )}
                <Tooltip id={`${projectfield.id}-tooltip`} />
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

export default ProjectForm;
