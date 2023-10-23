import { Blog } from "./Blog.types";

export type StatusProps = {
  status: boolean;
  message: string;
};

export type InitialStateProps = {
  blog: Blog[];
  isUpdate: boolean;
  success: StatusProps;
  error: StatusProps;
};
