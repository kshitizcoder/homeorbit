import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Auth/authApi";
import authSlice from "./Auth/authSlice";
import { propertyApi } from "./property/propertyApi";

import { chatApi } from "./chat/chatApi";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    [propertyApi.reducerPath]: propertyApi.reducer,

    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      propertyApi.middleware,
      chatApi.middleware
    ),
});

export default store;
