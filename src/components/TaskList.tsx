import { useSelector } from "react-redux";
import { StateProps, removeTask } from "../redux/slice";
import { useDispatch } from "react-redux";

type SelectorProps = {
  task: StateProps;
};

const TaskList = () => {
  const taskList = useSelector((state: SelectorProps) => state.task.value);

  const dispatch = useDispatch();

  function deleteTaskHandler(index: number) {
    dispatch(removeTask(index));
  }

  return (
    <section className="task__list__section">
      <ul
        style={{
          listStyleType: "none",
        }}
      >
        {taskList.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                margin: "2rem 0",
                border: "2px solid blue",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <li>{item}</li>
              <button
                onClick={() => deleteTaskHandler(index)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </ul>
    </section>
  );
};

export default TaskList;
