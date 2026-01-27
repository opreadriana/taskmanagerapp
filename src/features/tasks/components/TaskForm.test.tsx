import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./TaskForm";
import { PRIORITY_LEVELS, BUTTON_TEXT, MESSAGES } from "../constants";

describe("TaskForm", () => {
  const mockOnSubmit = jest.fn();
  const mockSetInput = jest.fn();
  const mockSetPriority = jest.fn();
  const mockSetDueDate = jest.fn();

  const defaultProps = {
    input: "",
    setInput: mockSetInput,
    priority: PRIORITY_LEVELS.HIGH,
    setPriority: mockSetPriority,
    dueDate: "",
    setDueDate: mockSetDueDate,
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with default values", () => {
    render(<TaskForm {...defaultProps} />);

    // Check input field exists with placeholder
    const inputField = screen.getByPlaceholderText(MESSAGES.PLACEHOLDER);
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue("");

    // Check priority select exists with default value
    const prioritySelect = screen.getByDisplayValue(PRIORITY_LEVELS.HIGH);
    expect(prioritySelect).toBeInTheDocument();

    // Check date input exists
    const dateInput = screen.getByLabelText(/due date/i);
    expect(dateInput).toHaveAttribute("type", "date");

    // Check submit button exists
    const submitButton = screen.getByRole("button", { name: BUTTON_TEXT.ADD });
    expect(submitButton).toBeInTheDocument();
  });

  it("renders with provided input value", () => {
    render(<TaskForm {...defaultProps} input="Test task" />);

    const inputField = screen.getByPlaceholderText(MESSAGES.PLACEHOLDER);
    expect(inputField).toHaveValue("Test task");
  });

  // Handling input changes for task name, priority and due date
  it("calls setInput when input value changes", () => {
    render(<TaskForm {...defaultProps} />);

    const inputField = screen.getByPlaceholderText(MESSAGES.PLACEHOLDER);
    fireEvent.change(inputField, { target: { value: "New task" } });

    expect(mockSetInput).toHaveBeenCalledTimes(1);
    expect(mockSetInput).toHaveBeenCalledWith("New task");
  });

  it("calls setPriority when priority value changes", () => {
    render(<TaskForm {...defaultProps} />);

    const prioritySelect = screen.getByDisplayValue(PRIORITY_LEVELS.HIGH);
    fireEvent.change(prioritySelect, {
      target: { value: PRIORITY_LEVELS.LOW },
    });

    expect(mockSetPriority).toHaveBeenCalledTimes(1);
    expect(mockSetPriority).toHaveBeenCalledWith(PRIORITY_LEVELS.LOW);
  });

  it("calls setDueDate when due date value changes", () => {
    render(<TaskForm {...defaultProps} />);

    const dateInput = screen.getByLabelText(/due date/i);
    fireEvent.change(dateInput, { target: { value: "2026-12-31" } });

    expect(mockSetDueDate).toHaveBeenCalledTimes(1);
    expect(mockSetDueDate).toHaveBeenCalledWith("2026-12-31");
  });

  it("renders all priority options", () => {
    render(<TaskForm {...defaultProps} />);

    expect(screen.getByText(PRIORITY_LEVELS.HIGH)).toBeInTheDocument();
    expect(screen.getByText(PRIORITY_LEVELS.MEDIUM)).toBeInTheDocument();
    expect(screen.getByText(PRIORITY_LEVELS.LOW)).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted", () => {
    render(<TaskForm {...defaultProps} input="Test task" />);

    const form = screen
      .getByRole("button", { name: BUTTON_TEXT.ADD })
      .closest("form");
    fireEvent.submit(form!);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls onSubmit when submit button is clicked", () => {
    render(<TaskForm {...defaultProps} input="Test task" />);

    const form = screen
      .getByRole("button", { name: BUTTON_TEXT.ADD })
      .closest("form");
    fireEvent.submit(form!);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("renders with all props populated", () => {
    const props = {
      input: "Complete project",
      setInput: mockSetInput,
      priority: PRIORITY_LEVELS.MEDIUM,
      setPriority: mockSetPriority,
      dueDate: "2026-06-15",
      setDueDate: mockSetDueDate,
      onSubmit: mockOnSubmit,
    };

    render(<TaskForm {...props} />);

    expect(screen.getByDisplayValue("Complete project")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(PRIORITY_LEVELS.MEDIUM)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("2026-06-15")).toBeInTheDocument();
  });
});
