import React, { useEffect, useState } from "react";

// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

import { Button, Chip, Stack, TextField } from "@mui/material";
import "@fontsource/roboto/400.css";

// import {
// addBlog,
// addBlogInfo,
// addSuccess,
// resetSuccess,
// updateBlog,
// updateIsUpdate,
// } from "../../redux/slice";
import { Blog } from "../../types/Blog.types";
// import { InitialStateProps } from "../../types/InitialStateProps.types";
import { useUseContext } from "../../pages/homepage/Homepage";
// import BlogContext from "../../contexts/BlogContext";

const initialBlogInfo: Blog = {
  id: crypto.randomUUID(),
  title: "",
  content: "",
  tags: [],
};

export default function BlogForm() {
  // const dispatch = useDispatch();

  const blogStateValue = useUseContext();

  const {
    initialState: { blogInfo, isUpdate, tagList },
    addOrUpdateBlogInfoFn,
    updateIsUpdateFn,
    addBlogFn,
    updateBlogFn,
    addSuccessFn,
    resetSuccessFn,
  } = blogStateValue;

  const [timeoutID, setTimeoutID] = useState<number | null>(null);

  function blogOnChangeHandler(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    event.preventDefault();
    const { name, value } = event.target;
    addOrUpdateBlogInfoFn({
      ...blogInfo,
      [name]: value,
    });
  }

  function updateIsFormInUpdateStatus() {
    updateIsUpdateFn();
    addOrUpdateBlogInfoFn(initialBlogInfo);
  }

  function tagsHandler(tag: string) {
    addOrUpdateBlogInfoFn({
      ...blogInfo,
      tags: [...new Set([...blogInfo.tags, tag])],
    });
  }

  function addBlogHandler(event: React.FormEvent) {
    event.preventDefault();

    if (blogInfo.title && blogInfo.content) {
      if (!isUpdate) {
        addBlogFn(blogInfo);
      } else {
        updateBlogFn(blogInfo);
        updateIsUpdateFn();
      }
      addSuccessFn({
        status: true,
        message: `Blog ${isUpdate ? "updated" : "added"} successfully`,
      });
      addOrUpdateBlogInfoFn(initialBlogInfo);

      const timeoutID = setTimeout(() => {
        resetSuccessFn();
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
