import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const folderApi = createApi({
  reducerPath: "folderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_FOLDER,
    credentials: "include", // Include cookies with every request
  }),

  endpoints: (builder) => ({
    createFolder: builder.mutation({
      query: (folderName) => ({
        url: "/create-folder",
        method: "POST",
        body: { folderName },
      }),
    }),
    storageStats: builder.query({
      query: (storageStats) => ({
        url: "/storage-stats",
        method: "GET",
        body: storageStats,
      }),
    }),
    
  }),
});

export const {
  useCreateFolderMutation,
  useStorageStatsQuery,
} = folderApi;
