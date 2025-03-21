import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api";
import { folderApi } from "./folder";
import authReducer from "./authSlice"
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [folderApi.reducerPath]: folderApi.reducer,
    auth:authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
setupListeners(store.dispatch);
