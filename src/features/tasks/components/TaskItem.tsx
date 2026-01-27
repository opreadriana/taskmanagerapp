import React from "react";
import { PRIORITY_LEVELS } from "../constants";

interface Task {
  id: string;
  text: string;
  done: boolean;
  priority: string;
  due_date: string | null;
  completed_at: string | null;
}

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case PRIORITY_LEVELS.HIGH:
        return "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200";
      case PRIORITY_LEVELS.MEDIUM:
        return "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case PRIORITY_LEVELS.LOW:
        return "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <li className="flex items-center justify-between mb-3 p-2 bg-white rounded dark:bg-gray-800">
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={task.done}
          onChange={onToggle}
          className="mr-2"
        />
        <span className={task.done ? "line-through opacity-60" : ""}>
          {task.text}
        </span>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <span
          className={`text-xs px-2 py-1 rounded ${getPriorityStyle(task.priority)}`}
        >
          {task.priority}
        </span>
        Due Date:{" "}
        {task.due_date && (
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {new Date(task.due_date).toLocaleDateString()}
          </span>
        )}
        Completed At Date:{" "}
        {task.completed_at && (
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {new Date(task.completed_at).toLocaleString()}
          </span>
        )}
        <button
          onClick={onDelete}
          className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
