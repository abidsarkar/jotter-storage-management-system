import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const api = createApi({
  reducerPath: 'api', // Ensure this is defined
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // Adjust base URL
  endpoints: (builder) => ({
    // Define your endpoints here
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    // Add more endpoints as needed
  }),
});

// Export the auto-generated hooks
export const { useLoginMutation, useSignupMutation } = api;