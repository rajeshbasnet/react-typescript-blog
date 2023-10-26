import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./slice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

export type BlogDispatch = typeof store.dispatch;
export type BlogRootState = ReturnType<typeof store.getState>;
