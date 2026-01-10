import React from "react";
import { render, screen } from "@testing-library/react";
import TodoPage from "./TodoPage";
import { TasksProvider } from "../../../app/TasksContext";

// Mock database to return error
jest.mock("../../../../supabaseClient", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        data: null,
        error: { message: "Database connection failed" },
      }),
      insert: () => ({ select: () => ({ data: [], error: null }) }),
      update: () => ({ eq: () => ({ error: null }) }),
    }),
  },
}));

// Unhappy path - database error scenario
describe("TodoPage error handling", () => {
  it("handles database error gracefully and shows no tasks message", async () => {
    // Mock console.error and console.log to avoid cluttering test output
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    
    render(
      <TasksProvider>
        <TodoPage />
      </TasksProvider>
    );

    // Should show "no tasks found" message when database fetch fails
    expect(await screen.findByText("No tasks found. Try adding a task above!")).toBeInTheDocument();
    
    // Should display the page title
    expect(screen.getByText("To-Do List")).toBeInTheDocument();
    
    // Restore console methods
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});
