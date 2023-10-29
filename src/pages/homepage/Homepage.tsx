import React, { useContext } from "react";
import Blog from "../../components/blog/Blog";
import { Alert } from "@mui/material";
import BlogContext, { BlogContextProps } from "../../contexts/BlogContext";

export function useUseContext() {
  const blogStateValue = useContext<BlogContextProps | undefined>(BlogContext);
  console.log(blogStateValue);

  if (blogStateValue == undefined) {
    throw new Error("Undefined value for BlogContextProps");
  }
  return blogStateValue;
}

const Homepage: React.FC = () => {
  const blogStateValue = useUseContext();

  const {
    success: { status: successStatus, message: successMessage },
    error: { status: errorStatus, message: errorMessage },
  } = blogStateValue;

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
