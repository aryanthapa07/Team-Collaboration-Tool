import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const workspaceApi = createApi({
  reducerPath: "workspaceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/workspaces/" }),
  endpoints: (builder) => ({
    createWorkspace: builder.mutation({
      query: (workspace) => ({
        url: "/",
        method: "POST",
        body: workspace,
        headers: { "Content-type": "application/json" },
      }),
    }),
    fetchWorkspaces: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    updateWorkspace: builder.mutation({
      query: ({ id, ...workspace }) => ({
        url: `/${id}/`,
        method: "PUT",
        body: workspace,
        headers: { "Content-type": "application/json" },
      }),
    }),
    deleteWorkspace: builder.mutation({
      query: (id) => ({
        url: `/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateWorkspaceMutation,
  useFetchWorkspacesQuery,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
} = workspaceApi;
