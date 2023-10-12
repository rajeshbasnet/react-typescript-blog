import React from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { Button, TextField } from "@mui/material";
import "@fontsource/roboto/400.css";

import {
  addBlog,
  addBlogInfo,
  updateBlog,
  updateIsUpdate,
} from "../../redux/slice";
import { Blog } from "../../types/Blog.types";
import { InitialStateProps } from "../../types/InitialStateProps.types";

const initialBlogInfo: Blog = {
  id: crypto.randomUUID(),
  title: "",
  content: "",
};

export default function BlogForm() {
  const dispatch = useDispatch();

  const blogInfo = useSelector(
    (state: { blog: InitialStateProps }) => state.blog.blogInfo
  );

  const isUpdate = useSelector(
    (state: { blog: InitialStateProps }) => state.blog.isUpdate
  );

  function blogOnChangeHandler(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    event.preventDefault();
    const { name, value } = event.target;
    dispatch(
      addBlogInfo({
        ...blogInfo,
        [name]: value,
      })
    );
  }

  function addBlogHandler(event: React.FormEvent) {
    event.preventDefault();

    if (blogInfo.title && blogInfo.content) {
      if (!isUpdate) {
        dispatch(addBlog(blogInfo));
      } else {
        dispatch(updateBlog(blogInfo));
        dispatch(updateIsUpdate());
      }

      // TODO : Add a toast or alert
      dispatch(addBlogInfo(initialBlogInfo));
    }
  }

  return (
    <section className="blog__form__section">
      <form className="w-full" onSubmit={addBlogHandler}>
        <TextField
          name="title"
          className="w-full"
          margin="dense"
          id="outlined-basic"
          label="Enter your title"
          variant="outlined"
          value={blogInfo.title}
          onChange={blogOnChangeHandler}
        />

        <TextField
          name="content"
          multiline
          rows={5}
          className="w-full"
          margin="dense"
          id="outlined-basic"
          label="Enter your description"
          variant="outlined"
          value={blogInfo.content}
          onChange={blogOnChangeHandler}
        />

        {isUpdate ? (
          <Button
            variant="contained"
            style={{ margin: "0.5rem 0" }}
            type="submit"
          >
            Update your post
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{ margin: "0.5rem 0" }}
            type="submit"
          >
            Add your post
          </Button>
        )}
      </form>
    </section>
  );
}
