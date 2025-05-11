"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const fetchTasks = async () => {
    const tasks = (await fetch("/api/tasks")).json();
    return tasks;
  };

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
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
    </div>
  );
}
