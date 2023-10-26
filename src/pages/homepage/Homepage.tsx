import React from "react";
import Blog from "../../components/blog/Blog";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { BlogRootState } from "../../redux/store";

// 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
const Homepage: React.FC = () => {
  const {
    success: { status: successStatus, message: successMessage },
    error: { status: errorStatus, message: errorMessage },
  } = useSelector((state: BlogRootState) => state.blog);

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
