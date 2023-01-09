import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const testsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'http://goittestqa-env.eba-s53mqkqf.us-east-1.elasticbeanstalk.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().currentUser.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users', 'Statistic'],
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
    resetTest: builder.mutation({
      query(testId) {
        return {
          url: `tests/reset`,
          method: 'PATCH',
          body: { testId },
        };
      },
    }),
    getTestList: builder.query({
      query() {
        return {
          url: `tests`,
        };
      },
      providesTags: ['Users'],
    }),
    getUsetSatistic: builder.query({
      query() {
        return {
          url: `statistic`,
        };
      },
      providesTags: ['Statistic'],
    }),
    deleteTestFromSatistic: builder.mutation({
      query(testId) {
        return {
          url: `statistic/${testId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Statistic'],
    }),
    getResult: builder.mutation({
      query(result) {
        return {
          url: `tests/result`,
          method: 'PATCH',
          body: result,
        };
      },
      invalidatesTags: ['Users', 'Statistic'],
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
  useGetUsetSatisticQuery,
  useResetTestMutation,
  useDeleteTestFromSatisticMutation,
} = testsApi;
