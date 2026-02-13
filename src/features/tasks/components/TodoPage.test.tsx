import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoPage from "./TodoPage";
import { TasksProvider } from "./TasksContext";

// Mock fetch API
global.fetch = jest.fn();

beforeEach(() => {
  (global.fetch as jest.Mock).mockClear();
  // Default mock for GET /api/tasks
  (global.fetch as jest.Mock).mockImplementation((url) => {
    if (url === "/api/tasks") {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            tasks: [
              {
                id: "1",
                text: "Test Task",
                done: false,
                priority: "High",
                due_date: "2026-01-10",
                completed_at: null,
              },
              {
                id: "2",
                text: "Another Task",
                done: true,
                priority: "Low",
                due_date: null,
                completed_at: null,
              },
            ],
          }),
      });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  });
});

// happy path renders TodoPage and verifies data fetching and rendering
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

  //test adding new task via input form
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

  // test loading spinner is displayed when loading
  it("shows loading spinner when loading is true", () => {
    render(
      <TasksProvider>
        <TodoPage />
      </TasksProvider>
    );
    expect(screen.getByText("Loading tasks...")).toBeInTheDocument();
  });

  // test loading spinner disappears after tasks load (unhappy path for loading)
  it("hides loading spinner after tasks load", async () => {
    render(
      <TasksProvider>
        <TodoPage />
      </TasksProvider>
    );
    // Wait for tasks to appear (which means loading is done)
    await screen.findByText("Test Task");
    // Loading spinner should no longer be in the document
    expect(screen.queryByText("Loading tasks...")).not.toBeInTheDocument();
  });
});
