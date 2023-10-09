import { createSlice } from "@reduxjs/toolkit";

export type StateProps = {
  value: string[];
};

const initialState: StateProps = {
  value: [],
};

type AddTaskAction<T extends string | number> = {
  type: string;
  payload: T;
};

const removeTaskFn = (state: StateProps, action: AddTaskAction<number>) => {
  let id = action.payload;

  var newTaskList = state.value.filter(
    (item: string, index: number) => index !== id
  );

  state.value = newTaskList;
};

const addTaskFn = (state: StateProps, action: AddTaskAction<string>) => {
  state.value = [...state.value, action.payload];
};

export const taskManagerSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: addTaskFn,
    removeTask: removeTaskFn,
  },
});

export const { addTask, removeTask } = taskManagerSlice.actions;

export default taskManagerSlice.reducer;
