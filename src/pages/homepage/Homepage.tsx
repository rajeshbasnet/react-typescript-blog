import React from "react";
import Blog from "../../components/blog/Blog";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { InitialStateProps } from "../../types/InitialStateProps.types";

//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

const Homepage: React.FC = () => {
  const success = useSelector(
    (state: { blog: InitialStateProps }) => state.blog.success
  );

  const error = useSelector(
    (state: { blog: InitialStateProps }) => state.blog.error
  );

  const { status: successStatus, message: successMessage } = success;

  const { status: errorStatus, message: errorMessage } = error;

  return (
    <>
      <Blog />

      <div className="absolute top-[2%] right-[2%]">
        {successStatus ? (
          <Alert severity="success">{successMessage}</Alert>
        ) : (
          <></>
        )}
        {errorStatus ? <Alert severity="error">{errorMessage}</Alert> : <></>}
      </div>
    </>
  );
};

export default Homepage;
