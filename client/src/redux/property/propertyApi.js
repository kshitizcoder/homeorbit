import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import AddProperty from "../../components/seller/AddProperty";
import { format } from "timeago.js";
const baseQuery = fetchBaseQuery({
  baseUrl: "https://homeorbit-backend.onrender.com",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("jwt");
    console.log("JWT Token Retrieved from Cookie:", token); // Debugging line

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      console.warn("JWT Token is undefined");
    }

    return headers;
  },
});

export const propertyApi = createApi({
  reducerPath: "property",
  baseQuery,
  endpoints: (builder) => ({
    getAllProperty: builder.query({
      query: ({ city, minPrice, maxPrice, type }) => ({
        url: `api/v1/property?city=${city}&minprice=${minPrice}&maxprice=${maxPrice}&type=${type}`,
      }),
    }),
    getAllPropertyByUser: builder.query({
      query: () => ({
        url: `api/v1/property/property-by-user`,
      }),
    }),
    addProperty: builder.mutation({
      query: (credentials) => ({
        url: `api/v1/property`,
        method: "POST",
        body: credentials,
      }),
    }),
    getProperty: builder.query({
      query: (id) => ({
        url: `api/v1/property/${id}`,
      }),
    }),
    getAllPropertyByAdmin: builder.query({
      query: () => ({
        url: `api/v1/property/get-property/admin`,
      }),
    }),
    getSavedProperty: builder.query({
      query: () => ({
        url: `api/v1/saved-property`,
      }),
    }),
    savedProperty: builder.mutation({
      query: (propertyId) => ({
        url: `api/v1/saved-property`,
        method: "POST",
        body: { propertyId },
      }),
    }),
    updateProperty: builder.mutation({
      query: ({ id, formData }) => {
        console.log(formData);
        console.log(id);
        return {
          url: `api/v1/property/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `api/v1/property/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllPropertyQuery,
  useAddPropertyMutation,
  useGetAllPropertyByUserQuery,
  useGetPropertyQuery,
  useGetAllPropertyByAdminQuery,
  useDeletePropertyMutation,
  useGetSavedPropertyQuery,
  useSavedPropertyMutation,
  useUpdatePropertyMutation,
} = propertyApi;
