import { useSelector } from "react-redux";
import { InitialStateProps } from "../../redux/types/InitialStateProps.types";
import { Box, Button, Paper, Typography } from "@mui/material";
import "@fontsource/roboto/500.css";

/**
 * TODO : Add badge feature in blog - tags
 *
 * @returns BlogList
 */
export default function BlogList() {
  const blogList = useSelector(
    (state: { blog: InitialStateProps }) => state.blog.blog
  );

  return (
    <section className="blog__list__section w-[40%] my-6 mx-auto">
      {blogList.map((item) => {
        return (
          <Box key={item.id} sx={{ margin: "3rem 0" }}>
            <Paper square={false} variant="outlined" className="px-2 py-2 my-2">
              <Typography variant="h6" className="capitalize">
                {item.title}
              </Typography>
            </Paper>

            <Paper square={false} variant="outlined" className="px-2 py-2 my-2">
              <Typography variant="subtitle1" className="my-4">
                {item.content}
              </Typography>
            </Paper>

            <div className="flex justify-end">
              <Button
                variant="contained"
                color="success"
                sx={{ marginRight: "1rem" }}
              >
                Update
              </Button>
              <Button variant="contained" color="error">
                Delete
              </Button>
            </div>
          </Box>
        );
      })}
    </section>
  );
}
