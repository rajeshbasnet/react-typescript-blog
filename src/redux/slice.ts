import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { blog } from "../util/Util";
import { Blog } from "../types/Blog.types";
import { InitialStateProps } from "../types/InitialStateProps.types";

type BlogPayload<T> = {
  type: string;
  payload: T;
};

const blogInfo: Blog = {
  id: crypto.randomUUID(),
  title: "",
  content: "",
};

const addBlogFn = (state: InitialStateProps, action: BlogPayload<Blog>) => {
  state.blog.push(action.payload);
};

const updateBlogFn = (state: InitialStateProps, action: BlogPayload<Blog>) => {
  const newBlogList = state.blog.filter(
    (blogItem) => blogItem.id !== action.payload.id
  );
  newBlogList.push(action.payload);
  state.blog = newBlogList;
};

const removeBlogFn = (
  state: InitialStateProps,
  action: BlogPayload<number>
) => {
  const id = action.payload;
  const newBlogList = state.blog.filter((_, index) => index !== id);
  state.blog = newBlogList;
};

const addOrUpdateBlogInfoFn = (
  state: InitialStateProps,
  action: PayloadAction<Blog>
) => {
  state.blogInfo = action.payload;
};

const updateIsUpdateFn = (state: InitialStateProps) => {
  state.isUpdate = !state.isUpdate;
};

const initialState: InitialStateProps = {
  blog: [],
  blogInfo,
  isUpdate: false,
};

export const blogSlice = createSlice({
  name: blog,
  initialState,
  reducers: {
    addBlog: addBlogFn,
    updateBlog: updateBlogFn,
    removeBlog: removeBlogFn,
    addBlogInfo: addOrUpdateBlogInfoFn,
    updateIsUpdate: updateIsUpdateFn,
  },
});

export const { addBlog, removeBlog, addBlogInfo, updateIsUpdate, updateBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
