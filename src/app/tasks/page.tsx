"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader } from "../components/Loader";

export default function Page() {
  const { user } = useUser();
  const userName =
    user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0];

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
    <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <div className="gap-y-8 flex flex-col">
        <div className="text-xl text-black dark:text-white">
          Tasks for {userName}
        </div>
        <div className="flex flex-col items-center justify-center">
          {loading ? (
            <Loader />
          ) : (
            <div className="text-black dark:text-white">
              {tasks.length === 0 ? (
                "No tasks found"
              ) : (
                <ul>
                  {tasks.map(
                    (task: {
                      _id: string;
                      name: string;
                      description: string;
                      completed: boolean;
                    }) => (
                      <li key={task._id}>
                        <h2>{task.name}</h2>
                        <p>{task.description}</p>
                        <p>{task.completed ? "Completed" : "Not Completed"}</p>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
