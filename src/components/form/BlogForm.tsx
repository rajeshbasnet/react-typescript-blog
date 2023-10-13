import React from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { Button, Chip, Stack, TextField } from "@mui/material";
import "@fontsource/roboto/400.css";

import {
  addBlog,
  addBlogInfo,
  addSuccess,
  resetSuccess,
  updateBlog,
  updateIsUpdate,
} from "../../redux/slice";
import { Blog } from "../../types/Blog.types";
import { InitialStateProps } from "../../types/InitialStateProps.types";

const initialBlogInfo: Blog = {
  id: crypto.randomUUID(),
  title: "",
  content: "",
  tags: [],
};

export default function BlogForm() {
  const dispatch = useDispatch();

  const blogInfo = useSelector(
    (state: { blog: InitialStateProps }) => state.blog.blogInfo
  );

  const isUpdate = useSelector(
    (state: { blog: InitialStateProps }) => state.blog.isUpdate
  );

  const tagList = useSelector(
    (state: { blog: InitialStateProps }) => state.blog.tagList
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

  function tagsHandler(tag: string) {
    console.log(tag);

    dispatch(
      addBlogInfo({
        ...blogInfo,
        tags: [...blogInfo.tags, tag],
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
      dispatch(
        addSuccess({
          status: true,
          message: `Blog ${isUpdate ? "updated" : "added"} successfully`,
        })
      );
      dispatch(addBlogInfo(initialBlogInfo));

      new Promise<number>((resolve) => {
        const timeoutID = setTimeout(() => {
          dispatch(resetSuccess());
        }, 2000);
        resolve(timeoutID);
      }).then((id) => clearTimeout(id));
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

        <Stack direction="row" spacing={1}>
          {tagList.map((tag, index) => {
            return (
              <Chip
                label={tag.toLowerCase()}
                key={index}
                onClick={() => {
                  tagsHandler(tag);
                }}
              />
            );
          })}
        </Stack>
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
