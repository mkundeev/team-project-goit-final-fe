import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const testsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'localhost:4000/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().currentUser.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users, Tests'],
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
    logOutUser: builder.mutation({
      query() {
        return {
          url: `users/logout`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Users'],
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
      query(testId) {
        return {
          url: `tests/random/${testId}`,
        };
      },
      providesTags: ['Users'],
    }),
    getTestList: builder.query({
      query() {
        return {
          url: `tests/`,
        };
      },
      providesTags: ['Tests'],
    }),
    getResult: builder.mutation({
      query(result) {
        return {
          url: `tests/result`,
          method: 'POST',
          body: result,
        };
      },
      providesTags: ['Users'],
    }),
    setAnswers: builder.mutation({
      query(answers) {
        return {
          url: `tests/answers`,
          method: 'PATCH',
          body: answers,
        };
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useAuthorizeUserMutation,
  useRegisterUserMutation,
  useLogOutUserMutation,
  useGetUserQuery,
  useGetResultMutation,
  useGetTestQuery,
  useGetTestListQuery,
  useSetAnswersMutation,
} = testsApi;
