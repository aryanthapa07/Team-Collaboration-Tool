import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateTaskMutation,
  useFetchProjectsQuery,
  useFetchWorkspaceMembersQuery,
  useUpdateTaskMutation,
} from "../services/TasksApi";
import { toast, Toaster } from "react-hot-toast";
import { getToken } from "../services/LocalStorageService";

const TaskForm = ({ onClose, initialData }) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: initialData || {},
  });
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const {access_token}=getToken();

  const { data: projects,refetch } = useFetchProjectsQuery();
  const [selectedProject, setSelectedProject] = useState(null);
  const { data: members, refetch: fetchMembers } =
    useFetchWorkspaceMembersQuery(selectedProject?.id, {
      skip: !selectedProject,
    });

  const projectId = watch("project");

  useEffect(()=>{
    if(access_token){
      refetch();
    }
  },[access_token,refetch])

  useEffect(() => {
    if (projectId) {
      const selected = projects?.find(
        (project) => project.id === parseInt(projectId)
      );
      setSelectedProject(selected);
    }
  }, [projectId, projects]);

  useEffect(() => {
    if (selectedProject) {
      fetchMembers();
    }
  }, [selectedProject, fetchMembers]);

  // If editing, set initial values
  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("description", initialData.description);
      setValue("assigned_user", initialData.assigned_user);
      setValue("status", initialData.status);
      setValue("project", initialData.project);
      if (initialData.deadline) {
        const formattedDeadline = new Date(initialData.deadline).toISOString().slice(0, 16);
        setValue("deadline", formattedDeadline);
      }
    }
  }, [initialData, setValue]);

  const onSubmit = async (data) => {
    console.log("Data from frontend", data);
    const actualData = {
      title: data.title,
      description: data.description,
      assigned_user: data.assigned_user,
      status: data.status,
      deadline: data.deadline,
      project: data.project,
    };
    let res;
    if (initialData) {
      res = await updateTask({ id: initialData.id, ...actualData });
    } else {
      res = await createTask(actualData);
    }

    if (res.error) {
      console.log(res.error);
    } else {
      toast.success(`Task ${initialData ? "Updated" : "Created"} Successfully`);
      onClose();
    }
  };

  return (
    <div className="dropDownFormPosition">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="dropDownFormStyling">
        <h2 className="dropDownFormHeading">
          {initialData ? "Edit Task" : "Create Task"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <section className="flex flex-col gap-2">
            <div>
              <span className="formLabel">Title</span>
              <input
                type="text"
                placeholder="Title"
                {...register("title")}
                className=" block w-full border  rounded-md shadow-sm p-2 border-gray-300"
              />
            </div>

            <div>
              <span className="formlabel">Description</span>
              <textarea
                placeholder="Description"
                {...register("description")}
                className=" block w-full border resize-none rounded-md shadow-sm p-2"
              />
            </div>

            {/* Project Dropdown */}
            <div>
              <span className="formlabel">Project</span>
              <select
                {...register("project")}
                defaultValue=""
                className="block w-full border resize-none rounded-md shadow-sm p-2"
              >
                <option value="" disabled>
                  Select Project
                </option>
                {projects &&
                  projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Assigned User Dropdown */}
            <div>
              <span className="formlabel">Assigned User</span>
              <select
                {...register("assigned_user")}
                defaultValue=""
                className="block w-full border resize-none rounded-md shadow-sm p-2"
              >
                <option value="" disabled>
                  Select Assigned User
                </option>
                {members &&
                  members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <span className="formlabel">Status</span>
              <select
                {...register("status")}
                defaultValue="pending"
                className="block w-full border resize-none rounded-md shadow-sm p-2"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <span className="formlabel">Deadline</span>
            <input
              type="datetime-local"
              {...register("deadline")}
              className="block w-full border resize-none rounded-md shadow-sm p-2"
            />

            <div className="dropDownFormButtons mt-3">
              <button type="button" onClick={onClose} className="graybutton">
                Close
              </button>
              <button type="submit" className="bluebutton">
                Create Task
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
