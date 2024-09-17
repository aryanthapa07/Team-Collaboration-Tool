import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./LocalStorageService";

export const TaskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_AUTH_BASE_URL}/tasks/`,
    prepareHeaders: (headers) => {
      const { access_token } = getToken();
      if (access_token) {
        headers.set("authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (task) => ({
        url: "/",
        method: "POST",
        body: task,
      }),
    }),
    fetchTask: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    updateTask: builder.mutation({
      query: ({ id, ...task }) => ({
        url: `/${id}/`,
        method: "PUT",
        body: task,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/${id}/`,
        method: "DELETE",
      }),
    }),
    fetchProjects: builder.query({
      query: () => ({
        url: "/my-projects/",
        method: "GET",
      }),
    }),
    fetchWorkspaceMembers: builder.query({
      query: (projectId) => ({
        url: `workspace-members/${projectId}/`,
        method: "GET",
      }),
    }),
    fetchTaskReport: builder.query({
      query: () => ({
        url: "/report/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useFetchTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useFetchProjectsQuery,
  useFetchWorkspaceMembersQuery,
  useFetchTaskReportQuery,
} = TaskApi;
