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
  name: string
  email: string
}

export const baseAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
    }),
    register: builder.mutation<UserResponse, RegisterRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useRegisterMutation,
  useLoginMutation,
} = baseAPI