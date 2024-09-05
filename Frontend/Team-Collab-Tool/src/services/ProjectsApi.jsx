import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./LocalStorageService"; // assuming you have a service to get the token

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/projects/",
    prepareHeaders: (headers) => {
      const { access_token } = getToken();
      if (access_token) {
        headers.set("authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (project) => ({
        url: "/",
        method: "POST",
        body: project,
        headers: { "Content-type": "application/json" }, // Content-type header remains
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
