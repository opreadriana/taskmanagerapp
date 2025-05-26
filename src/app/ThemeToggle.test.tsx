import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemedToggle";

describe("ThemeToggle", () => {
  it("renders the button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("toggles theme text", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/Switch to Dark Mode/i);
    fireEvent.click(button);
    expect(button).toHaveTextContent(/Switch to Light Mode/i);
  });
});