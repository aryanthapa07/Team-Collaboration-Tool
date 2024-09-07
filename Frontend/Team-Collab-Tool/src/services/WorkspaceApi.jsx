import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./LocalStorageService";

export const workspaceApi = createApi({
  reducerPath: "workspaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/workspaces/",
    prepareHeaders: (headers) => {
      const { access_token } = getToken();
      if (access_token) {
        headers.set("authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createWorkspace: builder.mutation({
      query: (workspace) => ({
        url: "/",
        method: "POST",
        body: workspace,
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
      }),
    }),
    deleteWorkspace: builder.mutation({
      query: (id) => ({
        url: `/${id}/`,
        method: "DELETE",
      }),
    }),
    fetchWorkspaceDropdown: builder.query({
      query: () => ({
        url: "dropdown/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateWorkspaceMutation,
  useFetchWorkspacesQuery,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useFetchWorkspaceDropdownQuery,
} = workspaceApi;
