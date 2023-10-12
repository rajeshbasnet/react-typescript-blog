import BlogForm from "../form/BlogForm";
import BlogList from "./BlogList";

export default function Blog() {
  return (
    <section className="w-[40%] my-6 mx-auto">
      <BlogForm />
      <BlogList />
    </section>
  );
}
