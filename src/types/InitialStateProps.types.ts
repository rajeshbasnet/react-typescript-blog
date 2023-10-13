import { Blog } from "./Blog.types";

export type StatusProps = {
  status: boolean;
  message: string;
};

export type InitialStateProps = {
  blog: Blog[];
  blogInfo: Blog;
  isUpdate: boolean;
  success: StatusProps;
  error: StatusProps;
  tagList: string[];
};
