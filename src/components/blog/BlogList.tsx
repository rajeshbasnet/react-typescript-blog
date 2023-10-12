import { useSelector } from "react-redux";
import { InitialStateProps } from "../../redux/types/InitialStateProps.types";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import "@fontsource/roboto/500.css";
import { useState } from "react";
import BlogForm from "../form/BlogForm";

/**
 * TODO : Add badge feature in blog - tags
 *
 * @returns BlogList
 */
export default function BlogList() {
  const blogList = useSelector(
    (state: { blog: InitialStateProps }) => state.blog.blog
  );

  const [updateFormOpen, setUpdateFormOpen] = useState<boolean>(false);

  function updateFormModal() {
    setUpdateFormOpen(!updateFormOpen);
  }

  return (
    <section className="blog__list__section">
      {blogList.map((item) => {
        return (
          <>
            <Box key={item.id} sx={{ margin: "3rem 0" }}>
              <Paper
                square={false}
                variant="outlined"
                className="px-2 py-2 my-2"
              >
                <Typography variant="h6" className="capitalize">
                  {item.title}
                </Typography>
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

              <div className="flex justify-end">
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginRight: "1rem" }}
                  onClick={updateFormModal}
                >
                  Update
                </Button>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </div>
            </Box>

            <Dialog open={updateFormOpen}>
              <DialogTitle id="alert-dialog-title">
                {"Update your Post Details"}
              </DialogTitle>

              <DialogContent>
                <BlogForm />
              </DialogContent>
            </Dialog>
          </>
        );
      })}
    </section>
  );
}
