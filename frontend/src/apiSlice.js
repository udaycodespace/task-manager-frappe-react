import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/method/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getTasks: builder.query({
      query: () => '/resource/Task?fields=["name","title","status","description"]',
      providesTags: ['Task'],
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: '/resource/Task',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation({
      query: ({ name, ...patch }) => ({
        url: `/resource/Task/${name}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      query: (name) => ({
        url: `/resource/Task/${name}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const { useLoginMutation, useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = apiSlice;