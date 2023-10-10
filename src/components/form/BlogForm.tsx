import { Button, TextField } from "@mui/material";
import "@fontsource/roboto/400.css";
import React, { useState } from "react";
import { Blog } from "../../types/Blog.types";

export default function BlogForm() {
  let [blogInfo, setBlogInfo] = useState<Blog>({
    id: "",
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


  return (
    <section className="blog__form__section w-[40%] my-6">
      <form className="w-full">
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
