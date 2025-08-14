import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InputWithError from "./InputWithError";

describe("InputWithError", () => {
  it("renders with props", () => {
    render(
      <InputWithError
        name="firstName"
        labelTitle="First Name:"
        errorMessage="Please enter at least 2 characters for the first name."
        type="text"
        placeholder="Clark"
        minLength={2}
      />,
    );
    const labelElement = screen.getByText("First Name:");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("for", "firstName");

    const inputElement = screen.getByPlaceholderText("Clark");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("name", "firstName");
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toBeRequired();
    expect(inputElement).toHaveAttribute("minlength", "2");
    expect(inputElement).toHaveAttribute("id", "firstName");

    const errorDiv = inputElement.parentElement;
    expect(errorDiv).toHaveAttribute(
      "data-error",
      "Please enter at least 2 characters for the first name.",
    );
  });
});
