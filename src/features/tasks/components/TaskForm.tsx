import React from "react";
import { PRIORITY_LEVELS, BUTTON_TEXT, MESSAGES } from "../constants";

const { HIGH, MEDIUM, LOW } = PRIORITY_LEVELS;
const { ADD } = BUTTON_TEXT;
const { PLACEHOLDER } = MESSAGES;

interface TaskFormProps {
  input: string;
  setInput: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function TaskForm({
  input,
  setInput,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  onSubmit,
}: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 mb-6 flex-wrap">
      <input
        className="px-2 py-1 rounded border border-blue-200 dark:bg-blue-950 dark:text-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={PLACEHOLDER}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="px-2 py-1 rounded border border-blue-200 dark:bg-blue-950 dark:text-white"
      >
        <option>{HIGH}</option>
        <option>{MEDIUM}</option>
        <option>{LOW}</option>
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
        {ADD}
      </button>
    </form>
  );
}
