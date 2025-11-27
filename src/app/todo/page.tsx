"use client";
import Link from "next/link";
import { useState } from "react";
import { useTasks } from "../context/TasksContext";
import { supabase } from "../../../supabaseClient";

export default function TodoPage() {
  const {tasks, setTasks, addTask} = useTasks();
  const [input, setInput] = useState("");

  // use await because addTask is an async function, it talks to Supabase
  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (input.trim()) {
    await addTask(input.trim());
    setInput("");
  }

  //update the 'done' property in DB and state
  async function toggleTask(idx: number) {
    const task = tasks[idx];
    const updatedDone = !task.done;
    await supabase
      .from('tasks')
      .update({ done: updatedDone })
      .eq('id', task.id);
    setTasks(tasks =>
      tasks.map((t, i) =>
        i === idx ? { ...t, done: updatedDone } : t
      )
    );
  }

  return (
    <>
      <header className="bg-white p-4 text-blue-900 text-center shadow-md dark:bg-blue-900 dark:text-white">
        <h1 className="text-3xl font-bold">To-Do List</h1>
      </header>

      <main className="flex-1 bg-gray-100 text-gray-900 p-8 min-h-[60vh] dark:bg-gray-900 dark:text-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Your To-Do List</h2>
        <form onSubmit={handleSubmit} className='flex gap-2 mb-6'>
          <input
            className="px-2 py-1 rounded border border-blue-200 dark:bg-blue-950 dark:text-white"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button
            type="submit"
            className="text-blue-900 bg-blue-200 px-4 py-2 rounded hover:bg-blue-300 transition-colors duration-200 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800"
          >
            Add
          </button>
        </form>
        <ul>
          {tasks.map((task, idx) => (
            <li key={idx} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(idx)}
                className="mr-2"
              />
              <span className={task.done ? "line-through opacity-60" : ""}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>


        <Link href="/">
          <button className="mt-8 text-blue-900 bg-blue-200 px-4 py-2 rounded hover:bg-blue-300 transition-colors duration-200 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800">
            Go Back Home
          </button>
        </Link>
      </main>

      <footer className="bg-white text-blue-900 text-center p-4 dark:bg-blue-900 dark:text-white">
        <p>Stay productive and keep track of your tasks!</p>
      </footer>
    </>
  );
}