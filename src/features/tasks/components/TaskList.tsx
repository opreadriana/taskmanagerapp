import React from "react";
import TaskItem from "./TaskItem";
import { MESSAGES } from "../constants";

interface Task {
  id: string;
  text: string;
  done: boolean;
  priority: string;
  due_date: string | null;
  completed_at: string | null;
}

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error?: string | null;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskList({
  tasks,
  loading,
  error,
  onToggleTask,
  onDeleteTask,
}: TaskListProps) {
  if (loading) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900 dark:border-blue-300"></div>
        <p className="mt-2">{MESSAGES.LOADING}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-200">
        {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <ul>
        <li className="text-gray-500">{MESSAGES.NO_TASKS}</li>
      </ul>
    );
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
        />
      ))}
    </ul>
  );
}
