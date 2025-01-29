import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Auth/authApi";
import authSlice from "./Auth/authSlice";
import { propertyApi } from "./property/propertyApi";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    [propertyApi.reducerPath]: propertyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, propertyApi.middleware),
});

export default store;
