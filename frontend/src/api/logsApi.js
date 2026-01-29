import { apiSlice } from './apiSlice';

export const logsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogs: builder.query({
      query: (params) => ({
        url: '/logs',
        params,
      }),
      providesTags: ['Logs'],
    }),
  }),
});

export const { useGetLogsQuery } = logsApi;
