import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./page";
import { TasksProvider } from "../features/tasks/context/TasksContext";

jest.mock("../../supabaseClient", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        data: [
          { id: 1, text: "Test Task", done: false, priority: "High", due_date: "2026-01-10" },
          { id: 2, text: "Another Task", done: true, priority: "Low", due_date: null },
        ],
        error: null,
      }),
      insert: () => ({ select: () => ({ data: [], error: null }) }),
      update: () => ({ eq: () => ({ error: null }) }),
    }),
  },
}));

describe("HomePage", () => {
  it("renders the main header and welcome text", () => {
    render(
      <TasksProvider>
        <Page />
      </TasksProvider>
    );
    expect(screen.getByRole("heading", { level: 1, name: "The Productivity App" })).toBeInTheDocument();
    expect(screen.getByText(/Welcome to the Productivity App!/)).toBeInTheDocument();
    expect(screen.getByText("Go to To-Do List page")).toBeInTheDocument();
  });

  it("renders the AI Assistant section", () => {
    render(
      <TasksProvider>
        <Page />
      </TasksProvider>
    );
    expect(screen.getByText("AI Assistant")).toBeInTheDocument();
  });

  it("renders the feedback email in the footer", () => {
    render(
      <TasksProvider>
        <Page />
      </TasksProvider>
    );
    expect(screen.getByText(/example@gmail.com/)).toBeInTheDocument();
  });

  it("renders the notebook image", () => {
    render(
      <TasksProvider>
        <Page />
      </TasksProvider>
    );
    const img = screen.getByAltText("Person writing in notebook");
    expect(img).toBeInTheDocument();
  });
});
