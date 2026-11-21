import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Post } from '../types/Post.types'

type RegisterRequest = {
  name: string
  email: string
  password: string
}

type LoginRequest = {
  email: string
  password: string
}

type UserResponse = {
  id: number
  email: string
}

export const baseAPI = createApi({
  reducerPath: 'api',
  tagTypes: ['Me'],
  baseQuery: fetchBaseQuery({
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => ({ url: 'http://localhost:3000/posts', credentials: 'omit' }),
    }),
    register: builder.mutation<UserResponse, Omit<RegisterRequest, 'name'>>({
      query: (body) => ({
        url: 'http://localhost:3000/auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (body) => ({
        url: 'http://localhost:3000/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Me'],
    }),
    getMe: builder.query<UserResponse, void>({
      query: () => 'http://localhost:3000/auth/me',
      providesTags: ['Me'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
} = baseAPI