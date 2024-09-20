import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./LocalStorageService";
export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_AUTH_BASE_URL}/api/user`,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint === "fetchUsers") {
        const { access_token } = getToken();
        if (access_token) {
          headers.set("authorization", `Bearer ${access_token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "register/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    LoginUser: builder.mutation({
      query: (user) => {
        return {
          url: "login/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getLoggedUser: builder.query({
      query: (access_token) => {
        return {
          url: "profile/",
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: "send-reset-password-email/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    resetUserPassword: builder.mutation({
      query: ({ actualdata, id, token }) => {
        return {
          url: `/reset-password/${id}/${token}/`,
          method: "POST",
          body: actualdata,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    fetchUsers: builder.query({
      query: () => {
        return {
          url: "/all-users/",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetLoggedUserQuery,
  useSendPasswordResetEmailMutation,
  useResetUserPasswordMutation,
  useFetchUsersQuery,
} = userAuthApi;
