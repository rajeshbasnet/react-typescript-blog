// import { Provider } from "react-redux";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
// import { store } from "./redux/store";
import BlogContext from "./contexts/BlogContext";
import { Blog } from "./types/Blog.types";
import { StatusProps } from "./types/InitialStateProps.types";
import { useCallback, useMemo, useState } from "react";

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

  const addBlogFn = useCallback(
    (payload: Blog) => {
      console.log("hello");
      setBlogs([...blogs, payload]);
    },
    [blogs]
  );

  const updateBlogFn = useCallback(
    (payload: Blog) => {
      const newBlogList = blogs.filter(
        (blogItem) => blogItem.id !== payload.id
      );
      newBlogList.push(payload);
      setBlogs(newBlogList);
    },
    [blogs]
  );

  const removeBlogFn = useCallback(
    (id: string) => {
      const newBlogList = blogs.filter((blogItem) => blogItem.id !== id);
      setBlogs(newBlogList);
    },
    [blogs]
  );

  const addOrUpdateBlogInfoFn = useCallback((payload: Blog) => {
    setBlogInfo(payload);
  }, []);

  const updateIsUpdateFn = useCallback(() => {
    setIsUpdate(!isUpdate);
  }, [isUpdate]);

  const addSuccessFn = useCallback((payload: StatusProps) => {
    setSuccess(payload);
  }, []);

  const addErrorFn = useCallback((payload: StatusProps) => {
    setError(payload);
  }, []);

  const resetSuccessFn = useCallback(() => {
    setSuccess({
      ...success,
      status: false,
      message: "",
    });
  }, [success]);

  const resetErrorFn = useCallback(() => {
    setError({
      ...error,
      status: false,
      message: "",
    });
  }, [error]);

  const addTagListFn = useCallback(
    (payload: string) => {
      setTagList([...tagList, payload]);
    },
    [tagList]
  );

  const contextValue = useMemo(
    () => ({
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
    }),
    [
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
      resetErrorFn,
      resetSuccessFn,
      addTagListFn,
    ]
  );

  return (
    <BlogContext.Provider value={contextValue}>
      <Homepage />
    </BlogContext.Provider>
  );
}

export default App;
