import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slice";
import TaskList from "./TaskList";

const TaskForm = () => {
  const [userInput, setUserInput] = useState<string>("");

  const dispatch = useDispatch();

  function formHandler(event: React.FormEvent) {
    event.preventDefault();
    dispatch(addTask(userInput));
  }

  return (
    <>
      <section className="form_section">
        <form onSubmit={formHandler}>
          <input
            type="text"
            value={userInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserInput(event.target.value)
            }
          />
          <button type="submit">Add task</button>
        </form>
      </section>

      <TaskList />
    </>
  );
};

export default TaskForm;
