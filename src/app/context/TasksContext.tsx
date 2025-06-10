"use client";
import React, { createContext, useContext, useState } from "react";

export type Task = { text: string; done: boolean };

type TasksContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

//the Context that holds the current list of tasks and function to update them
const TasksContext = createContext<TasksContextType | undefined>(undefined);

// React state is used to store the 'tasks'
export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}

// custom hook to use the TasksContext in any component
export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within a TasksProvider");
  return context;
}