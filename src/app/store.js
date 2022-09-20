import { configureStore } from "@reduxjs/toolkit";
import { testsApi } from "./testsApi";

export const store = configureStore({
  reducer: {
    [testsApi.reducerPath]: testsApi.reducer,
  },
});
