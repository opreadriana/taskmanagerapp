"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";

export type Task = { id: string; text: string; done: boolean };

type TasksContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (text: string) => Promise<void>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

// React state is used to store the 'tasks', and we pass the tasks and function to update them as the value to the Provider
export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks from Supabase on mount
  useEffect(() => {
    async function fetchTasks() {
      const { data, error } = await supabase.from('tasks').select('*');
      if (data){ setTasks(data)} else {console.log('Error fetching tasks: ', error)};
    }
    fetchTasks();
  }, []);

  // Add a task to Supabase with the given text and update Context
  async function addTask(text: string) {
    const { data } = await supabase
      .from('tasks')
      .insert([{ text, done: false }])
      .select();
    if (data) setTasks(prev => [...prev, ...data]);
  }

  return (
    <TasksContext.Provider value={{ tasks, setTasks, addTask }}>
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