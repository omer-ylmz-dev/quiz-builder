import { createApi } from '@reduxjs/toolkit/query/react';
import axiosInstance from '../utils/axiosInstance';
import type { Quiz, QuizForm, QuizSummary } from '../types';

const baseQuery = async ({ url, method, data }: { url: string; method: string; data?: any }) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data,
    });
    return { data: response.data };
  } catch (err) {
    return { error: err };
  }
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['Quiz', 'Quizzes'], 

  endpoints: (builder) => ({
    getQuizzes: builder.query<QuizSummary[], void>({
      query: () => ({ url: '/quizzes', method: 'GET' }),
      providesTags: (result) =>
        result ? [
          { type: 'Quizzes', id: 'LIST' },
          ...result.map((quiz) => ({ type: 'Quiz' as const, id: quiz.id }))
        ] : [],
    }),

    getQuiz: builder.query<Quiz, string>({
      query: (id) => ({ url: `/quizzes/${id}`, method: 'GET' }),
      //@ts-ignore
      providesTags: (result, error, id) => [{ type: 'Quiz' as const, id }],
    }),

    deleteQuiz: builder.mutation<void, number>({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: 'DELETE',
      }),
       //@ts-ignore
      invalidatesTags: (result, error, id) => [
        { type: 'Quiz' as const, id },
        { type: 'Quizzes' as const, id: 'LIST' },
      ],
    }),

    createQuiz: builder.mutation<void, QuizForm>({
      query: (newQuiz) => ({
        url: '/quizzes',
        method: 'POST',
        data: newQuiz,
      }),
      invalidatesTags: [{ type: 'Quizzes' as const, id: 'LIST' }],
    }),
  }),
});

export const { 
  useGetQuizQuery, 
  useGetQuizzesQuery, 
  useDeleteQuizMutation, 
  useCreateQuizMutation 
} = api;
