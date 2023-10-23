import { createContext } from "react";
import { StatusProps } from "../types/InitialStateProps.types";
import { Blog } from "../types/Blog.types";

export default createContext<BlogContextProps | undefined>(undefined);

export type BlogContextProps = {
  blogInfo: Blog;
  tagList: string[];
  blogs: Blog[];
  success: StatusProps;
  error: StatusProps;
  isUpdate: boolean;
  addBlogFn: (blog: Blog) => void;
  updateBlogFn: (blog: Blog) => void;
  removeBlogFn: (payload: string) => void;
  addOrUpdateBlogInfoFn: (payload: Blog) => void;
  updateIsUpdateFn: () => void;
  addSuccessFn: (payload: StatusProps) => void;
  addErrorFn: (payload: StatusProps) => void;
  resetSuccessFn: () => void;
  resetErrorFn: () => void;
  addTagListFn: (payload: string) => void;
};
