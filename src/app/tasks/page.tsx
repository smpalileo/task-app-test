"use client";
import { createContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { DataTableComponent } from "../components/DataTable";

export const AppContext = createContext({
  userName: "",
  loading: true,
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

  useEffect(() => {
    fetchTasks().then((tasks) => {
      setTimeout(() => {
        setTasks(tasks);
        setLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <AppContext.Provider value={{ userName, loading }}>
      <DataTableComponent data={tasks} />
    </AppContext.Provider>
  );
}
