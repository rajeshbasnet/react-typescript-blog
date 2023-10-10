import { Button, TextField } from "@mui/material";
import "@fontsource/roboto/400.css";
import React, { useState } from "react";
import { Blog } from "../../types/Blog.types";
import { useDispatch } from "react-redux";
import { addBlog } from "../../redux/slice";

export default function BlogForm() {
  const dispatch = useDispatch();

  let [blogInfo, setBlogInfo] = useState<Blog>({
    id: crypto.randomUUID(),
    title: "",
    content: "",
  });

  function blogOnChangeHandler(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    event.preventDefault();
    const { name, value } = event.target;
    setBlogInfo((prevState: Blog) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function addBlogHandler(event: React.FormEvent) {
    event.preventDefault();

    if (blogInfo.title && blogInfo.content) {
      dispatch(addBlog(blogInfo));
    }
  }

  return (
    <section className="blog__form__section w-[40%] my-6 mx-auto">
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

        <Button
          variant="contained"
          style={{ margin: "0.5rem 0" }}
          type="submit"
        >
          Add your post
        </Button>
      </form>
    </section>
  );
}