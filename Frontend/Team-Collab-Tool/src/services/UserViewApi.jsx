import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./LocalStorageService";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_AUTH_BASE_URL}/users/`,
      prepareHeaders: (headers) => {
        const { access_token } = getToken();
        if (access_token) {
          headers.set("authorization", `Bearer ${access_token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      fetchUsers: builder.query({
        query: () => ({
          url: "/",
          method: "GET",
        }),
      }),
      updateUser: builder.mutation({
        query: ({ id, ...user }) => ({
          url: `/${id}/`,
          method: "PUT",
          body: user,
        }),
      }),
      deleteUser: builder.mutation({
        query: (id) => ({
          url: `/${id}/`,
          method: "DELETE",
        }),
      }),
    }),
  });
  
  export const {
    useFetchUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
  } = userApi;