"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTasks } from "../context/TasksContext";
import { supabase } from "../../../../supabaseClient";

export default function TodoPage() {
  const { tasks, setTasks, addTask, loading } = useTasks();
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    console.log("TodoPage mounted");
    console.log("Tasks array:", tasks);
  }, [tasks]);

  // use await because addTask is an async function, it talks to Supabase
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) {
      await addTask(input.trim(), priority, dueDate || null);
      setInput("");
      setDueDate("");
      setPriority("Medium");
    }
  }

  // Sort tasks by priority (High > Medium > Low), then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    const aPriority =
      priorityOrder[a.priority as keyof typeof priorityOrder] ?? 1;
    const bPriority =
      priorityOrder[b.priority as keyof typeof priorityOrder] ?? 1;
    if (aPriority !== bPriority) return aPriority - bPriority;
    if (a.due_date && b.due_date) return a.due_date.localeCompare(b.due_date);
    return a.due_date ? -1 : 1;
  });

  //update the 'done' property and completed_at timestamp (which gets current timestamp) in DB and state
  async function toggleTask(idx: number) {
    const task = tasks[idx];
    if (!task || !task.id) {
      console.error("Task or task.id is undefined!", task);
      return;
    }
    const updatedDone = !task.done;
    const completedAt = updatedDone ? new Date().toISOString() : null;
    
    const { error } = await supabase
      .from("tasks")
      .update({ 
        done: updatedDone,
        completed_at: completedAt
      })
      .eq("id", task.id);
      
    if (error) {
      console.error("Supabase update error:", error);
    }
    setTasks((tasks) =>
      tasks.map((t, i) => (i === idx ? { ...t, done: updatedDone, completed_at: completedAt } : t))
    );
  }

  return (
    <>
      <header className="bg-white p-4 text-blue-900 text-center shadow-md dark:bg-blue-900 dark:text-white">
        <h1 className="text-3xl font-bold">To-Do List</h1>
      </header>

      <main className="flex-1 bg-gray-100 text-gray-900 p-8 min-h-[60vh] dark:bg-gray-900 dark:text-gray-200 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Your To-Do List</h2>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6 flex-wrap">
            <input
              className="px-2 py-1 rounded border border-blue-200 dark:bg-blue-950 dark:text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-2 py-1 rounded border border-blue-200 dark:bg-blue-950 dark:text-white"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-2 py-1 rounded border border-blue-200 dark:bg-blue-950 dark:text-white"
            />
            <button
              type="submit"
              className="text-blue-900 bg-blue-200 px-4 py-2 rounded hover:bg-blue-300 transition-colors duration-200 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800"
            >
              Add
            </button>
          </form>
          
          {loading ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900 dark:border-blue-300"></div>
              <p className="mt-2">Loading tasks...</p>
            </div>
          ) : (
            <ul>
              {sortedTasks.length === 0 ? (
                <li className="text-gray-500">
                  No tasks found. Try adding a task above!
                </li>
              ) : (
              sortedTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between mb-3 p-2 bg-white rounded dark:bg-gray-800"
                >
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={async () => {
                        await toggleTask(
                          tasks.findIndex((t) => t.id === task.id)
                        );
                      }}
                      className="mr-2"
                    />
                    <span
                      className={task.done ? "line-through opacity-60" : ""}
                    >
                      {task.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        task.priority === "High"
                          ? "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : task.priority === "Medium"
                            ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {task.priority}
                    </span>
                    {task.due_date && (
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(task.due_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
          )}

          <Link href="/">
            <button className="mt-8 text-blue-900 bg-blue-200 px-4 py-2 rounded hover:bg-blue-300 transition-colors duration-200 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800">
              Go Back Home
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