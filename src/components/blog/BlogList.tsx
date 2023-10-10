import { useSelector } from "react-redux";
import { InitialStateProps } from "../../redux/types/InitialStateProps.types";

export default function BlogList() {
  let blogList = useSelector(
    (state: { blog: InitialStateProps }) => state.blog.blog
  );

  return (
    <section className="blog__list__section w-[40%] my-6 mx-auto">
      {blogList.map((item) => {
        console.log(item);

        return (
          <div key={item.id}>
            <p>{item.title}</p>
            <p>{item.content}</p>
          </div>
        );
      })}
    </section>
  );
}
