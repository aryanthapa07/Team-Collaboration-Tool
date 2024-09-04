// projectapi.jsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/projects/" }), // Update the base URL here
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (project) => ({
        url: "/",
        method: "POST",
        body: project,
        headers: { "Content-type": "application/json" },
      }),
    }),
    fetchProjects: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    updateProject: builder.mutation({
      query: ({ id, ...project }) => ({
        url: `/${id}/`,
        method: "PUT",
        body: project,
        headers: { "Content-type": "application/json" },
      }),
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useFetchProjectsQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
