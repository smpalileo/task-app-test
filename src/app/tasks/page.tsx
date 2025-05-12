/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { createContext, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { DataTableComponent } from "../components/DataTable";
import { AddButton, BackButton } from "../components/Button";
import { DialogComponent } from "../components/Modal";
import { Box } from "@mui/material";

export const AppContext = createContext({
  userName: "",
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => {},
  tasks: [],
  setTasks: (tasks: never[]) => {},
});

export default function Page() {
  const { user } = useUser();
  const userName =
    user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0] || "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  return (
    <AppContext.Provider
      value={{
        userName,
        isModalOpen,
        setIsModalOpen,
        tasks,
        setTasks,
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
      {isModalOpen && <DialogComponent title={"Create New Task"} />}
    </AppContext.Provider>
  );
}
