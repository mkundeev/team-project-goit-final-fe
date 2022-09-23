import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const testsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().currentUser.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: builder => ({
    registerUser: builder.mutation({
      query(user) {
        return {
          url: `users/signup`,
          method: 'POST',
          body: user,
        };
      },
      invalidatesTags: ['Users'],
    }),
    authorizeUser: builder.mutation({
      query(user) {
        return {
          url: `users/login`,
          method: 'POST',
          body: user,
        };
      },
      invalidatesTags: ['Users'],
    }),
    authorizeUserByGoogle: builder.mutation({
      query(code) {
        return {
          url: `users/googlelogin`,
          method: 'POST',
          body: code,
        };
      },
      invalidatesTags: ['Users'],
    }),
    logOutUser: builder.mutation({
      query() {
        return {
          url: `users/logout`,
          method: 'POST',
        };
      },
    }),
    getUser: builder.query({
      query() {
        return {
          url: `users/current`,
        };
      },
      providesTags: ['Users'],
    }),
    getTest: builder.query({
      query: testId => ({ url: `tests/random/${testId}` }),
    }),
    getTestList: builder.query({
      query() {
        return {
          url: `tests/`,
        };
      },
      providesTags: ['Users'],
    }),
    getResult: builder.mutation({
      query(result) {
        return {
          url: `tests/result`,
          method: 'PATCH',
          body: result,
        };
      },
      invalidatesTags: ['Users'],
    }),
    setAnswers: builder.mutation({
      query(answers) {
        return {
          url: `tests/answer`,
          method: 'PATCH',
          body: answers,
        };
      },
    }),
    result: builder.mutation({
      query(result) {
        return {
          url: `tests/result`,
          method: 'PATCH',
          body: result,
        };
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useAuthorizeUserMutation,
  useAuthorizeUserByGoogleMutation,
  useRegisterUserMutation,
  useLogOutUserMutation,
  useGetUserQuery,
  useGetResultMutation,
  useGetTestListQuery,
  useSetAnswersMutation,
  useGetTestQuery,
  useResultMutation,
} = testsApi;
