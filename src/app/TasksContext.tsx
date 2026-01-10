"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export type Task = {
  id: string;
  text: string;
  done: boolean;
  priority: "High" | "Medium" | "Low";
  due_date: string | null;
  completed_at: string | null;
};

type TasksContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  loading: boolean;
  addTask: (
    text: string,
    priority: string,
    due_date: string | null
  ) => Promise<void>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

// React state is used to store the 'tasks', and we pass the tasks and function to update them as the value to the Provider
export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch tasks from Supabase on mount, and avoid fetching auto-generated columns
  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .select("id, text, done, priority, due_date, completed_at");
      if (data) {
        setTasks(data);
      } else {
        console.log("Error fetching tasks: ", error);
      }
      setLoading(false);
    }
    fetchTasks();
  }, []);

  // Add a task to Supabase with the given text, priority, and due_date, then update Context
  async function addTask(
    text: string,
    priority: string,
    due_date: string | null
  ) {
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ text, done: false, priority: priority || "Medium", due_date, completed_at: null }])
      .select();
    if (error) {
      console.error("Supabase insert error:", error);
    }
    console.log("Supabase insert data:", data);
    if (data) setTasks((prev) => [...prev, ...data]);
  }

  return (
    <TasksContext.Provider value={{ tasks, setTasks, loading, addTask }}>
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