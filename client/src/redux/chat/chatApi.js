import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import AddProperty from "../../components/seller/AddProperty";
const baseQuery = fetchBaseQuery({
  baseUrl: "https://homeorbit-backend.onrender.com",
  prepareHeaders: (headers) => {
    const token = Cookies.get("jwt");
    // console.log("JWT Token Retrieved from Cookie:", token); // Debugging line

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      console.warn("JWT Token is undefined");
    }

    return headers;
  },
});

export const chatApi = createApi({
  reducerPath: "chat",
  baseQuery,
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => ({
        url: `api/v1/chats`,
      }),
    }),
    getChat: builder.query({
      query: (id) => ({
        url: `api/v1/chats/${id}`,
      }),
    }),
    addChat: builder.mutation({
      query: (receiverId) => ({
        url: `api/v1/chats/`,
        method: "POST",
        body: { receiverId },
      }),
    }),
    addMessages: builder.mutation({
      query: ({ text, id }) => ({
        url: `api/v1/messages/${id}`,
        method: "POST",
        body: { text },
      }),
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatQuery,
  useAddChatMutation,
  useAddMessagesMutation,
} = chatApi;
