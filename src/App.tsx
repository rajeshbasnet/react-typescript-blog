// import { Provider } from "react-redux";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
// import { store } from "./redux/store";
import BlogContext from "./contexts/BlogContext";
import { Blog } from "./types/Blog.types";
import {
  InitialStateProps,
  StatusProps,
} from "./types/InitialStateProps.types";
import { useState } from "react";

export type BlogContextProps = {
  initialState: InitialStateProps;
  addBlogFn: (blog: Blog) => void;
  updateBlogFn: (blog: Blog) => void;
  removeBlogFn: (payload: string) => void;
  addOrUpdateBlogInfoFn: (payload: Blog) => void;
  updateIsUpdateFn: () => void;
  addSuccessFn: (payload: StatusProps) => void;
  addErrorFn: (payload: StatusProps) => void;
  resetSuccessFn: () => void;
  resetErrorFn: () => void;
  addTagListFn: (payload: string) => void;
};

function App() {
  const blogInfo: Blog = {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    tags: [],
  };

  const tagList = ["sports", "life", "adventures", "social-life"];

  const [initialState, setInitialState] = useState<InitialStateProps>({
    blog: [],
    blogInfo,
    isUpdate: false,
    tagList,
    success: {
      status: false,
      message: "",
    },
    error: {
      status: false,
      message: "",
    },
  });

  const addBlogFn = (payload: Blog) => {
    setInitialState({
      ...initialState,
      blog: [...initialState.blog, payload],
    });
  };

  const updateBlogFn = (payload: Blog) => {
    const newBlogList = initialState.blog.filter(
      (blogItem) => blogItem.id !== payload.id
    );
    newBlogList.push(payload);
    setInitialState({ ...initialState, blog: newBlogList });
  };

  const removeBlogFn = (id: string) => {
    const newBlogList = initialState.blog.filter(
      (blogItem) => blogItem.id !== id
    );
    setInitialState({ ...initialState, blog: newBlogList });
  };

  const addOrUpdateBlogInfoFn = (payload: Blog) => {
    setInitialState({ ...initialState, blogInfo: payload });
  };

  const updateIsUpdateFn = () => {
    setInitialState({ ...initialState, isUpdate: !initialState.isUpdate });
  };

  const addSuccessFn = (payload: StatusProps) => {
    setInitialState({ ...initialState, success: payload });
  };

  const addErrorFn = (payload: StatusProps) => {
    setInitialState({ ...initialState, error: payload });
  };

  const resetSuccessFn = () => {
    setInitialState({
      ...initialState,
      success: {
        status: false,
        message: "",
      },
    });
  };

  const resetErrorFn = () => {
    setInitialState({
      ...initialState,
      error: {
        status: false,
        message: "",
      },
    });
  };

  const addTagListFn = (payload: string) => {
    setInitialState({
      ...initialState,
      tagList: [...initialState.tagList, payload],
    });
  };

  return (
    <BlogContext.Provider
      value={{
        initialState,
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
