import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testsApi = createApi({
  reducerPath: "contacts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().currentUser.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(user) {
        return {
          url: `users/signup`,
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["Users"],
    }),
    authorizeUser: builder.mutation({
      query(user) {
        return {
          url: `users/login`,
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["Users"],
    }),
    logOutUser: builder.mutation({
      query() {
        return {
          url: `users/logout`,
          method: "POST",
        };
      },
      invalidatesTags: ["Users"],
    }),
    getUser: builder.query({
      query() {
        return {
          url: `users/current`,
        };
      },
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useAuthorizeUserMutation,
  useRegisterUserMutation,
  useLogOutUserMutation,
  useGetUserQuery,
} = testsApi;
