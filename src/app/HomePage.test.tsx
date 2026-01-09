import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("HomePage", () => {
  it("renders the main header and welcome text", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { level: 1, name: "The Productivity App" })).toBeInTheDocument();
    expect(screen.getByText(/Welcome to the Productivity App!/)).toBeInTheDocument();
    expect(screen.getByText("Go to To-Do List page")).toBeInTheDocument();
  });

  it("renders the AI Assistant section", () => {
    render(<Page />);
    expect(screen.getByText("AI Assistant")).toBeInTheDocument();
  });

  it("renders the feedback email in the footer", () => {
    render(<Page />);
    expect(screen.getByText(/example@gmail.com/)).toBeInTheDocument();
  });

  it("renders the notebook image", () => {
    render(<Page />);
    const img = screen.getByAltText("Person writing in notebook");
    expect(img).toBeInTheDocument();
  });
});
