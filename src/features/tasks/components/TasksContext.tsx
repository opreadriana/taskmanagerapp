"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

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
  toggleTask: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

// React state is used to store the 'tasks', and we pass the tasks and function to update them as the value to the Provider
export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch tasks from API on mount
  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", response.status, errorData);
          throw new Error(
            `Failed to fetch tasks: ${errorData.error || response.statusText}`
          );
        }
        const data = await response.json();
        setTasks(data.tasks || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  // Add a task via API with the given text, priority, and due_date, then update Context
  async function addTask(
    text: string,
    priority: string,
    due_date: string | null
  ) {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          priority: priority || "Medium",
          due_date,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const data = await response.json();
      if (data.task) {
        setTasks((prev) => [data.task, ...prev]);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  // Toggle task done status via API
  async function toggleTask(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      console.error("Task not found:", taskId);
      return;
    }

    const updatedDone = !task.done;

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: updatedDone }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const data = await response.json();
      if (data.task) {
        setTasks((tasks) =>
          tasks.map((t) => (t.id === taskId ? data.task : t))
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  // Delete a task via API
  async function deleteTask(taskId: string) {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((tasks) => tasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, loading, addTask, toggleTask, deleteTask }}
    >
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
