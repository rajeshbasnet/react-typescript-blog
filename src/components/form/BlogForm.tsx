import React, { useEffect, useState } from "react";

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
import { BlogDispatch, BlogRootState } from "../../redux/store";
import { addBlog_AC } from "../../redux/action.creators";

const initialBlogInfo: Blog = {
  id: crypto.randomUUID(),
  title: "",
  content: "",
  tags: [],
};

export default function BlogForm() {
  const dispatch = useDispatch<BlogDispatch>();

  const { blogInfo, isUpdate, tagList } = useSelector(
    (state: BlogRootState) => state.blog
  );

  const [timeoutID, setTimeoutID] = useState<number | null>(null);

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

  function updateIsFormInUpdateStatus() {
    dispatch(updateIsUpdate());
    dispatch(addBlogInfo(initialBlogInfo));
  }

  function tagsHandler(tag: string) {
    dispatch(
      addBlogInfo({
        ...blogInfo,
        tags: [...new Set([...blogInfo.tags, tag])],
      })
    );
  }

  function addBlogHandler(event: React.FormEvent) {
    event.preventDefault();

    if (blogInfo.title && blogInfo.content) {
      dispatch(addBlog_AC(blogInfo));
      dispatch(
        addSuccess({
          status: true,
          message: `Blog ${isUpdate ? "updated" : "added"} successfully`,
        })
      );
      dispatch(addBlogInfo(initialBlogInfo));

      const timeoutID = setTimeout(() => {
        dispatch(resetSuccess());
      }, 2000);

      setTimeoutID(timeoutID);
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutID) {
        clearTimeout(timeoutID);
        setTimeoutID(null);
      }
    };
  });

  return (
    <section className="blog__form__section">
      <form id="blog-form" className="w-full" onSubmit={addBlogHandler}>
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
          <>
            <Button
              variant="contained"
              style={{ margin: "1rem 0" }}
              type="submit"
            >
              Update your post
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ margin: "1rem 1rem" }}
              onClick={updateIsFormInUpdateStatus}
            >
              Close
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            style={{ margin: "1rem 0" }}
            type="submit"
          >
            Add your post
          </Button>
        )}
      </form>
    </section>
  );
}
