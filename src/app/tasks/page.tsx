/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { createContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { DataTableComponent } from "../components/DataTable";
import { AddButton, BackButton } from "../components/Button";
import { DialogComponent } from "../components/Modal";
import { Box } from "@mui/material";

export const AppContext = createContext({
  userName: "",
  loading: true,
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => {},
});

export default function Page() {
  const { user } = useUser();
  const userName =
    user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0] || "";

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    return tasks;
  };

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks().then((tasks) => {
      setTimeout(() => {
        setTasks(tasks);
        setLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{ userName, loading, isModalOpen, setIsModalOpen }}
    >
      <Box
        sx={{
          width: "auto",
        }}
      >
        <div className="flex-col">
          <BackButton />
          <AddButton />
        </div>
        <DataTableComponent data={tasks} />
      </Box>
      {isModalOpen && <DialogComponent title={"Create New Task"} />}
    </AppContext.Provider>
  );
}
