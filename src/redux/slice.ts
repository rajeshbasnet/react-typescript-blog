import { createSlice } from "@reduxjs/toolkit";
import { blog } from "../util/Util";
import { Blog } from "../types/Blog.types";
import { InitialStateProps } from "./types/InitialStateProps.types";

type BlogPayload<T> = {
  type: string;
  payload: T;
};

const addBlog = (state: InitialStateProps, action: BlogPayload<Blog>) => {
  state.blog = [...state.blog, action.payload];
};

const removeBlog = (state: InitialStateProps, action: BlogPayload<number>) => {
  const id = action.payload;

  const newBlogList = state.blog.filter((_, index) => index !== id);
  state.blog = newBlogList;
};

const initialState: InitialStateProps = {
  blog: [],
};

export const slice = createSlice({
  name: blog,
  initialState,
  reducers: {
    addBlog,
    removeBlog,
  },
});
