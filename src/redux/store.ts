import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slice";

export default configureStore({
  reducer: {
    task: taskReducer,
  },
});
