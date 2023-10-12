import { Blog } from "./Blog.types";

type StatusProps = {
  status: boolean;
  message: string;
};

export type InitialStateProps = {
  blog: Blog[];
  blogInfo: Blog;
  isUpdate: boolean;
  success: StatusProps;
  error: StatusProps;
};
