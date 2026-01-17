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
  onToggleTask: (taskId: string) => void;
}

export default function TaskList({ tasks, loading, onToggleTask }: TaskListProps) {
  if (loading) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900 dark:border-blue-300"></div>
        <p className="mt-2">{MESSAGES.LOADING}</p>
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
        />
      ))}
    </ul>
  );
}
