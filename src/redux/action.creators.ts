import { Blog } from "../types/Blog.types";
import { BlogDispatch, BlogRootState } from "./store";
import { addBlog, updateBlog, updateIsUpdate } from "./slice";

export const addBlog_AC = (blogInfo: Blog) => {
  return (dispatch: BlogDispatch, getState: () => BlogRootState) => {
    const { isUpdate } = getState().blog;
    if (!isUpdate) {
      dispatch(addBlog(blogInfo));
    } else {
      dispatch(updateBlog(blogInfo));
      dispatch(updateIsUpdate());
    }
  };
};
