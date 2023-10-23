// import { Provider } from "react-redux";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
// import { store } from "./redux/store";
import BlogContext from "./contexts/BlogContext";
import { Blog } from "./types/Blog.types";
import { StatusProps } from "./types/InitialStateProps.types";
import { useState } from "react";

function App() {
  const [blogInfo, setBlogInfo] = useState<Blog>({
    id: crypto.randomUUID(),
    title: "",
    content: "",
    tags: [],
  });

  const [tagList, setTagList] = useState<string[]>([
    "sports",
    "life",
    "adventures",
    "social-life",
  ]);

  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [success, setSuccess] = useState<StatusProps>({
    status: false,
    message: "",
  });

  const [error, setError] = useState<StatusProps>({
    status: false,
    message: "",
  });

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const addBlogFn = (payload: Blog) => {
    setBlogs([...blogs, payload]);
  };

  const updateBlogFn = (payload: Blog) => {
    const newBlogList = blogs.filter((blogItem) => blogItem.id !== payload.id);
    newBlogList.push(payload);
    setBlogs(newBlogList);
  };

  const removeBlogFn = (id: string) => {
    const newBlogList = blogs.filter((blogItem) => blogItem.id !== id);
    setBlogs(newBlogList);
  };

  const addOrUpdateBlogInfoFn = (payload: Blog) => {
    setBlogInfo(payload);
  };

  const updateIsUpdateFn = () => {
    setIsUpdate(!isUpdate);
  };

  const addSuccessFn = (payload: StatusProps) => {
    setSuccess(payload);
  };

  const addErrorFn = (payload: StatusProps) => {
    setError(payload);
  };

  const resetSuccessFn = () => {
    setSuccess({
      ...success,
      status: false,
      message: "",
    });
  };

  const resetErrorFn = () => {
    setError({
      ...error,
      status: false,
      message: "",
    });
  };

  const addTagListFn = (payload: string) => {
    setTagList([...tagList, payload]);
  };

  return (
    <BlogContext.Provider
      value={{
        blogInfo,
        tagList,
        blogs,
        success,
        error,
        isUpdate,
        addBlogFn,
        updateBlogFn,
        removeBlogFn,
        addOrUpdateBlogInfoFn,
        updateIsUpdateFn,
        addSuccessFn,
        addErrorFn,
        resetSuccessFn,
        resetErrorFn,
        addTagListFn,
      }}
    >
      <Homepage />
    </BlogContext.Provider>
  );
}

export default App;
