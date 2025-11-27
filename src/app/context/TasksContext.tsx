"use client";
import React, { createContext, useContext, useState } from "react";

export type Task = { text: string; done: boolean };

type TasksContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

//create a that holds tasks data and the function to update it
const TasksContext = createContext<TasksContextType | undefined>(undefined);

// React state is used to store the 'tasks', and we pass the tasks and function to update them as the value to the Provider
export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}

// custom hook to use the TasksContext in any component, by calling useContext(TasksContext)
export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within a TasksProvider");
  return context;
}