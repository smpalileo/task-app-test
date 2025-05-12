"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { DataTableComponent } from "../components/DataTable";
import { AddButton, BackButton } from "../components/Button";
import { DialogComponent } from "../components/Modal";
import { Box } from "@mui/material";
import { AppContext, initialState } from "../context/AppContext";

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
