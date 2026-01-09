import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import TodoPage from "./TodoPage";
import { TasksProvider, TasksContext } from "../context/TasksContext";

jest.mock("../../../../supabaseClient", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        data: [
          {
            id: 1,
            text: "Test Task",
            done: false,
            priority: "High",
            due_date: "2026-01-10",
          },
          { id: 2, text: "Another Task", done: true, priority: "Low", due_date: null },
        ],
        error: null,
      }),
      insert: () => ({ select: () => ({ data: [], error: null }) }),
      update: () => ({ eq: () => ({ error: null }) }),
    }),
  },
}));

describe("TodoPage", () => {
  it("renders TodoPage and tasks", async () => {
    render(
      <TasksProvider>
        <TodoPage />
      </TasksProvider>
    );
    expect(screen.getByText("To-Do List")).toBeInTheDocument();
    // Wait for tasks to appear after async fetch
    expect(await screen.findByText("Test Task")).toBeInTheDocument();
    expect(await screen.findByText("Another Task")).toBeInTheDocument();
  });

  it("can type and submit a new task", async () => {
    render(
      <TasksProvider>
        <TodoPage />
      </TasksProvider>
    );
    const input = screen.getByPlaceholderText("Add a new task...");
    fireEvent.change(input, { target: { value: "New Task" } });
    expect(input).toHaveValue("New Task");
    const addButton = screen.getByText("Add");
    await act(async () => {
      fireEvent.click(addButton);
    });
    expect(input).toHaveValue("");
  });

  it("shows loading spinner when loading is true", () => {
    // Render TodoPage inside TasksProvider, which will show loading spinner initially
    render(
      <TasksProvider>
        <TodoPage />
      </TasksProvider>
    );
    expect(screen.getByText("Loading tasks...")).toBeInTheDocument();
  });
});
