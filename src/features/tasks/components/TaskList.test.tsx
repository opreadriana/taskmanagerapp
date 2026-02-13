import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "./TaskList";
import { MESSAGES } from "../constants";

interface MockTask {
  id: string;
  text: string;
  done: boolean;
  priority: string;
  due_date: string | null;
  completed_at: string | null;
}

interface MockTaskItemProps {
  task: MockTask;
  onToggle: () => void;
  onDelete: () => void;
}

// Mock TaskItem component
jest.mock("./TaskItem", () => {
  return function MockTaskItem({
    task,
    onToggle,
    onDelete,
  }: MockTaskItemProps) {
    return (
      <li data-testid={`task-item-${task.id}`}>
        <span onClick={onToggle}>{task.text}</span>
        <button onClick={onDelete}>Delete</button>
      </li>
    );
  };
});

describe("TaskList", () => {
  const mockOnToggleTask = jest.fn();
  const mockOnDeleteTask = jest.fn();

  const mockTasks = [
    {
      id: "1",
      text: "Task 1",
      done: false,
      priority: "High",
      due_date: "2026-12-31",
      completed_at: null,
    },
    {
      id: "2",
      text: "Task 2",
      done: true,
      priority: "Medium",
      due_date: null,
      completed_at: "2026-01-20T10:00:00Z",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state when loading is true", () => {
    render(
      <TaskList
        tasks={[]}
        loading={true}
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    expect(screen.getByText(MESSAGES.LOADING)).toBeInTheDocument();
    // Check for spinner div
    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("renders error message when error prop is provided", () => {
    const errorMessage = "Failed to fetch tasks";
    render(
      <TaskList
        tasks={[]}
        loading={false}
        error={errorMessage}
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders no tasks message when tasks array is empty", () => {
    render(
      <TaskList
        tasks={[]}
        loading={false}
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    expect(screen.getByText(MESSAGES.NO_TASKS)).toBeInTheDocument();
  });

  it("renders list of tasks when tasks are provided", () => {
    render(
      <TaskList
        tasks={mockTasks}
        loading={false}
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    expect(screen.getByTestId("task-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("task-item-2")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("calls onToggleTask when task item is clicked", () => {
    render(
      <TaskList
        tasks={mockTasks}
        loading={false}
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    const taskItem = screen.getByText("Task 1");
    taskItem.click();

    expect(mockOnToggleTask).toHaveBeenCalledTimes(1);
    expect(mockOnToggleTask).toHaveBeenCalledWith("1");
  });

  it("renders correct number of task items", () => {
    render(
      <TaskList
        tasks={mockTasks}
        loading={false}
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    const taskItems = screen.getAllByTestId(/task-item-/);
    expect(taskItems).toHaveLength(2);
  });

  it("prioritizes loading over error state", () => {
    const errorMessage = "Connection error";
    render(
      <TaskList
        tasks={[]}
        loading={true}
        error={errorMessage}
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    // Loading should be shown even if error exists
    expect(screen.getByText(MESSAGES.LOADING)).toBeInTheDocument();
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });

  it("prioritizes loading over empty tasks message", () => {
    render(
      <TaskList
        tasks={[]}
        loading={true}
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    expect(screen.getByText(MESSAGES.LOADING)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES.NO_TASKS)).not.toBeInTheDocument();
  });

  it("does not render loading or error when tasks are present", () => {
    render(
      <TaskList
        tasks={mockTasks}
        loading={false}
        onToggleTask={mockOnToggleTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    expect(screen.queryByText(MESSAGES.LOADING)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES.NO_TASKS)).not.toBeInTheDocument();
  });
});
