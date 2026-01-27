import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoPage from "./TodoPage";
import { TasksProvider } from "./TasksContext";

// Mock fetch API to return error
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
    status: 500,
    json: () => Promise.resolve({ error: "Database connection failed" }),
  })
) as jest.Mock;

// Unhappy path - database error scenario
describe("TodoPage error handling", () => {
  it("handles database error gracefully and shows no tasks message", async () => {
    // Mock console.error and console.log to avoid cluttering test output
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    render(
      <TasksProvider>
        <TodoPage />
      </TasksProvider>
    );

    // Should show "no tasks found" message when database fetch fails
    expect(
      await screen.findByText("No tasks found. Try adding a task above!")
    ).toBeInTheDocument();

    // Should display the page title
    expect(screen.getByText("To-Do List")).toBeInTheDocument();

    // Restore console methods
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});
