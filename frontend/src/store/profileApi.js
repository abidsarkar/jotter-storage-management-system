import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_PROFILE,
    credentials: "include", // Send cookies
  }),
  endpoints: (builder) => ({
    editProfile: builder.mutation({
      query: (username) => ({
        url: "/edit-profile",
        method: "PUT",
        body:  username ,
        credentials:"include",
      }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: "/delete-account",
        method: "DELETE",
        credentials:"include",
      }),
    }),
  }),
});

export const { useEditProfileMutation, useDeleteAccountMutation } = profileApi;
