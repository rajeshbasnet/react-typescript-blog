import { useSelector } from "react-redux";
import { StateProps } from "../redux/slice";

type SelectorProps = {
  task: StateProps;
};

const TaskList = () => {
  const taskList = useSelector((state: SelectorProps) => state.task.value);

  return (
    <section className="task__list__section">
      <ul>
        {taskList.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </section>
  );
};

export default TaskList;
