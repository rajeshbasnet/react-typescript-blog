import { Blog } from "./Blog.types";

export type InitialStateProps = {
  blog: Blog[];
  blogInfo: Blog;
  isUpdate?: boolean;
};
