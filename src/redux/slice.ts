import { createSlice } from "@reduxjs/toolkit";
import { blog } from "../util/Util";
import { Blog } from "../types/Blog.types";
import { InitialStateProps } from "./types/InitialStateProps.types";

type BlogPayload<T> = {
  type: string;
  payload: T;
};

const addBlogFn = (state: InitialStateProps, action: BlogPayload<Blog>) => {
  state.blog.push(action.payload);
};

const removeBlogFn = (
  state: InitialStateProps,
  action: BlogPayload<number>
) => {
  const id = action.payload;

  const newBlogList = state.blog.filter((_, index) => index !== id);
  state.blog = newBlogList;
};

const initialState: InitialStateProps = {
  blog: [],
};

export const blogSlice = createSlice({
  name: blog,
  initialState,
  reducers: {
    addBlog: addBlogFn,
    removeBlog: removeBlogFn,
  },
});

export const { addBlog, removeBlog } = blogSlice.actions;

export default blogSlice.reducer;
