import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import "@fontsource/roboto/500.css";
import React, { useEffect, useState } from "react";
import BlogForm from "../form/BlogForm";
import { useUseContext } from "../../pages/homepage/Homepage";

/**
 *
 * @returns BlogList
 */
export default function BlogList() {
  const blogStateValue = useUseContext();

  const {
    blogs: blogList,
    isUpdate,
    updateIsUpdateFn,
    addOrUpdateBlogInfoFn,
    addSuccessFn,
    resetSuccessFn,
    removeBlogFn,
  } = blogStateValue;

  const [timeoutID, setTimeoutID] = useState<number | null>(null);

  function updateIsFormInUpdateStatus() {
    updateIsUpdateFn();
  }

  function loadUpdateBlogModal(id: string | undefined) {
    updateIsFormInUpdateStatus();

    const foundBlog = id && blogList.find((blog) => blog.id === id);
    foundBlog && addOrUpdateBlogInfoFn(foundBlog);
  }

  function deleteBlog(id: string | undefined) {
    id && removeBlogFn(id);
    addSuccessFn({
      status: true,
      message: "Blog removed successfully",
    });

    const timeoutID = setTimeout(() => {
      resetSuccessFn();
    }, 1000);

    setTimeoutID(timeoutID);
  }

  useEffect(() => {
    return () => {
      timeoutID && clearTimeout(timeoutID);
    };
  });

  return (
    <section className="blog__list__section">
      {blogList.map((item) => {
        const { tags } = item;

        return (
          <React.Fragment key={item.id}>
            <Box sx={{ margin: "3rem 0" }}>
              <Paper
                square={false}
                variant="outlined"
                className="px-2 py-2 my-2"
              >
                <Typography variant="h6">{item.title}</Typography>
              </Paper>

              <Paper
                square={false}
                variant="outlined"
                className="px-2 py-2 my-2"
              >
                <Typography variant="subtitle1" className="my-4">
                  {item.content}
                </Typography>
              </Paper>

              <Stack direction="row" spacing={1}>
                {tags.map((tag, index) => {
                  return <Chip label={tag.toLowerCase()} key={index} />;
                })}
              </Stack>

              <div className="flex justify-end">
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginRight: "1rem" }}
                  onClick={() => loadUpdateBlogModal(item.id)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteBlog(item.id)}
                >
                  Delete
                </Button>
              </div>
            </Box>

            <Dialog open={isUpdate} onClose={updateIsFormInUpdateStatus}>
              <DialogTitle id="alert-dialog-title">
                {"Update your Post Details"}
              </DialogTitle>

              <DialogContent>
                <BlogForm />
              </DialogContent>
            </Dialog>
          </React.Fragment>
        );
      })}
    </section>
  );
}
