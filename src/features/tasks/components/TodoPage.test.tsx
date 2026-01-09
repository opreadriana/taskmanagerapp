import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoPage from "./TodoPage";

// Mock context and supabase, so a real database is not needed (adds fake tasks for testing)
jest.mock("../context/TasksContext", () => ({
  useTasks: () => ({
    tasks: [
      { id: 1, text: "Test Task", done: false, priority: "High", due_date: "2026-01-10" },
      { id: 2, text: "Another Task", done: true, priority: "Low", due_date: null }
    ],
    setTasks: jest.fn(),
    addTask: jest.fn(),
    loading: false,
  }),
}));

// Basic render test
it("renders TodoPage and tasks", () => {
  render(<TodoPage />);
  expect(screen.getByText("To-Do List")).toBeInTheDocument();
  expect(screen.getByText("Test Task")).toBeInTheDocument();
  expect(screen.getByText("Another Task")).toBeInTheDocument();
});

// Test adding a task (UI only, not DB)
it("can type and submit a new task", () => {
  render(<TodoPage />);
  const input = screen.getByPlaceholderText("Add a new task...");
  fireEvent.change(input, { target: { value: "New Task" } });
  expect(input).toHaveValue("New Task");
  const addButton = screen.getByText("Add");
  fireEvent.click(addButton);
  // addTask is mocked, so no new task appears, but input resets
  expect(input).toHaveValue("");
});

// Test loading state spinner
it("shows loading spinner when loading is true", () => {
  jest.mock("../context/TasksContext", () => ({
    useTasks: () => ({
      tasks: [],
      setTasks: jest.fn(),
      addTask: jest.fn(),
      loading: true,
    }),
  }));
  render(<TodoPage />);
  expect(screen.getByText("Loading tasks...")).toBeInTheDocument();
});
