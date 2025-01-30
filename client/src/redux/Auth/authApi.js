import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
const baseQuery = fetchBaseQuery({
  baseUrl: "https://homeorbit-backend.onrender.com/",
  // baseUrl: "http://localhost:4500/",
  credentials: "include",

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "api/v1/users/signup",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/v1/users/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logOut: builder.mutation({
      query: () => ({
        url: "api/v1/users/logout",
        method: "POST",
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `api/v1/users/me`,
      }),
    }),

    updateMe: builder.mutation({
      query: ({ id, formData }) => {
        return {
          url: `api/v1/users/updateme/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    getAllUser: builder.query({
      query: () => ({
        url: `api/v1/users/all-users`,
      }),
    }),
    getUserStats: builder.query({
      query: () => ({
        url: `api/v1/users/getuser/stats`,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogOutMutation,
  useGetUserProfileQuery,
  useUpdateMeMutation,
  useGetAllUserQuery,
  useGetUserStatsQuery,
} = apiSlice;
