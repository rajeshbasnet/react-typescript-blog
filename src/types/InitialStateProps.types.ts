import { Blog } from "./Blog.types";

export type StatusProps = {
  status: boolean;
  message: string;
};

export type InitialStateProps = {
  blogInfo: Blog;
  blog: Blog[];
  isUpdate: boolean;
  tagList: string[];
  success: StatusProps;
  error: StatusProps;
};
