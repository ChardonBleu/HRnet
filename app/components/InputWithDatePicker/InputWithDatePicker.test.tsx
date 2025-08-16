import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InputWithDatePickerAndError from "./InputWithDatePicker";

describe("InputWithError", () => {
  it("renders with props", () => {
    render(
      <InputWithDatePickerAndError
        name="birthDate"
        labelTitle="Birth Date:"
        placeholder="01/01/1970"
      />,
    );
    const labelElement = screen.getByText("Birth Date:");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("for", "birthDate");

    const inputElement = screen.getByPlaceholderText("01/01/1970");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("name", "birthDate");
    expect(inputElement).toBeRequired();
    expect(inputElement).toHaveAttribute("id", "birthDate");
  });
});
