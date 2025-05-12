/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";

export const initialState = {
  _id: "",
  name: "",
  description: "",
  deadline: undefined,
  tags: [],
  completed: false,
};

export const AppContext = createContext({
  userName: "",
  isModalOpen: { state: false, isNew: true },
  setIsModalOpen: (isModalOpen: { state: boolean; isNew: boolean }) => {},
  tasks: [],
  setTasks: (tasks: never[]) => {},
  props: initialState,
  setProps: (props: {
    _id: string;
    name: string;
    description: string;
    deadline: undefined;
    tags: never[];
    completed: boolean;
  }) => {},
});
