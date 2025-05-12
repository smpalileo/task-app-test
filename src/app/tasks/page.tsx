/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { createContext, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { DataTableComponent } from "../components/DataTable";
import { AddButton, BackButton } from "../components/Button";
import { DialogComponent } from "../components/Modal";
import { Box } from "@mui/material";

const initialState = {
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

export default function Page() {
  const { user } = useUser();
  const userName =
    user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0] || "";

  const [isModalOpen, setIsModalOpen] = useState({ state: false, isNew: true });
  const [tasks, setTasks] = useState([]);
  const [props, setProps] = useState(initialState);

  return (
    <AppContext.Provider
      value={{
        userName,
        isModalOpen,
        setIsModalOpen,
        tasks,
        setTasks,
        props,
        setProps,
      }}
    >
      <Box
        sx={{
          m: "4",
          width: "auto",
        }}
      >
        <div>
          <BackButton />
          <AddButton />
        </div>
        <DataTableComponent />
      </Box>
      {isModalOpen.state && (
        <DialogComponent
          title={isModalOpen.isNew ? "Create New Task" : "Update Task"}
        />
      )}
    </AppContext.Provider>
  );
}
