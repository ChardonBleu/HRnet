import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InputWithDatePicker from "./InputWithDatePicker";

describe("InputWithDatePicker", () => {
  it("renders with props", () => {
    render(<InputWithDatePicker name="birthDate" labelTitle="Birth Date:" />);
    const labelElement = screen.getByText("Birth Date:");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("for", "birthDate");

    const inputElement = screen.getByPlaceholderText("aaaa-mm-jj");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("name", "birthDate");
    expect(inputElement).toBeRequired();
    expect(inputElement).toHaveAttribute("id", "birthDate");
  });
});
