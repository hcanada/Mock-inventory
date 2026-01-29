import { apiSlice } from './apiSlice';

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query({
      query: () => '/dashboard/summary',
      providesTags: ['Dashboard'],
    }),
    getDashboardCharts: builder.query({
      query: () => '/dashboard/charts',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetDashboardSummaryQuery, useGetDashboardChartsQuery } =
  dashboardApi;
