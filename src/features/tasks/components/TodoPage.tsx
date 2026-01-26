"use client";
import React from "react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useTasks } from "./TasksContext";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { PRIORITY_LEVELS, PRIORITY_ORDER, BUTTON_TEXT } from "../constants";
import toast, { Toaster } from "react-hot-toast";

export default function TodoPage() {
  const { tasks, addTask, loading, toggleTask } = useTasks();
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<string>(PRIORITY_LEVELS.MEDIUM);
  const [dueDate, setDueDate] = useState("");

  // use await because addTask is an async function, it talks to Supabase
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }

    try {
      await addTask(input.trim(), priority, dueDate || null);
      setInput("");
      setDueDate("");
      setPriority(PRIORITY_LEVELS.MEDIUM);
      toast.success("Task added successfully!");
    } catch (err) {
      console.error("Failed to add task:", err);
      toast.error("Failed to add task. Please try again.");
    }
  }

  // Sort tasks by priority (High > Medium > Low), then by due date
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const aPriority =
        PRIORITY_ORDER[a.priority as keyof typeof PRIORITY_ORDER] ?? 1;
      const bPriority =
        PRIORITY_ORDER[b.priority as keyof typeof PRIORITY_ORDER] ?? 1;
      if (aPriority !== bPriority) return aPriority - bPriority;
      if (a.due_date && b.due_date) return a.due_date.localeCompare(b.due_date);
      return a.due_date ? -1 : 1;
    });
  }, [tasks]);

  return (
    <>
      <Toaster position="top-right" />
      <header className="bg-white p-4 text-blue-900 text-center shadow-md dark:bg-blue-900 dark:text-white">
        <h1 className="text-3xl font-bold">To-Do List</h1>
      </header>

      <main className="flex-1 bg-gray-100 text-gray-900 p-8 min-h-[60vh] dark:bg-gray-900 dark:text-gray-200 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Your To-Do List</h2>

          <TaskForm
            input={input}
            setInput={setInput}
            priority={priority}
            setPriority={setPriority}
            dueDate={dueDate}
            setDueDate={setDueDate}
            onSubmit={handleSubmit}
          />

          <TaskList
            tasks={sortedTasks}
            loading={loading}
            error={error}
            onToggleTask={toggleTask}
          />

          <Link href="/">
            <button className="mt-8 text-blue-900 bg-blue-200 px-4 py-2 rounded hover:bg-blue-300 transition-colors duration-200 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800">
              {BUTTON_TEXT.GO_BACK_HOME}
            </button>
          </Link>
        </div>
      </main>

      <footer className="bg-white text-blue-900 text-center p-4 dark:bg-blue-900 dark:text-white">
        <p>Stay productive and keep track of your tasks!</p>
      </footer>
    </>
  );
}
