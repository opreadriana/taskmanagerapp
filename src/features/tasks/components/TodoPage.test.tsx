import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import TodoPage from "./TodoPage";
import { TasksProvider } from "../../../app/TasksContext";

// Mock database interactions 
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
            completed_at: null,
          },
          { id: 2, text: "Another Task", done: true, priority: "Low", due_date: null, completed_at: null },
        ],
        error: null,
      }),
      insert: () => ({ select: () => ({ data: [], error: null }) }),
      update: () => ({ eq: () => ({ error: null }) }),
    }),
  },
}));

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

  // unhappy path - simulate database error during fetch
  it("handles database error gracefully (unhappy path)", async () => {
    // Mock console.error to avoid cluttering the test output
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    
    // As in the beginning, mocks database - then temporarily overrides the previous mock to create a new one that return error
    jest.resetModules();
    jest.doMock("../../../../supabaseClient", () => ({
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

    // Dynamically import components with the error mock, while tests above continue to use the original mock from top of file
    const { default: TodoPageError } = await import("./TodoPage");
    const { TasksProvider: TasksProviderError } = await import("../../../app/TasksContext");
    
    render(
      <TasksProviderError>
        <TodoPageError />
      </TasksProviderError>
    );

    // Should show no tasks message when fetch fails
    expect(await screen.findByText("No tasks found. Try adding a task above!")).toBeInTheDocument();
    
    // Restore console.error
    consoleSpy.mockRestore();
  });
});
