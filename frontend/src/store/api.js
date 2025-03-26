import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_AUTH,
    credentials: "include", // Include cookies with every request
  }),

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (verificationData) => ({
        url: "/verify-email",
        method: "POST",
        body: verificationData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: (email) => ({
        url: "/request-reset",
        method: "POST",
        body: { email },
      }),
    }),
    verifyResetOTP: builder.mutation({
      query: (otpData) => ({
        url: "/verify-otp",
        method: "POST",
        body: otpData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: "/reset-password",
        method: "POST",
        body: resetData,
      }),
    }),
    // Add this new endpoint to fetch the logged-in user's information
    getUser: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
        credentials: "include",
      }),
    }),
    googleLogin: builder.query({
      query: () => ({
        url: "/google",
        method: "GET",
      }),
    }),
    // Logout
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
    changePassword: builder.mutation({
      query: ({ currentPassword, newPassword, confirmNewPassword }) => ({
        url: "/change-password",
        method: "POST",
        body: { currentPassword, newPassword, confirmNewPassword },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useLoginMutation,
  useRequestPasswordResetMutation,
  useVerifyResetOTPMutation,
  useResetPasswordMutation,
  useGetUserQuery,
  useGoogleLoginQuery,
  useLogoutMutation,
  useChangePasswordMutation
} = authApi;
