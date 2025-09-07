import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SelectWithError from "./SelectWithError";

describe("InputWithError", () => {
  it("renders with props", () => {
    render(
      <SelectWithError
        name="state"
        labelTitle="State:"
        options={["un", "deux"]}
      />,
    );
    const labelElement = screen.getByText("State:");
    expect(labelElement).toBeInTheDocument();

    const selectElement = screen.getByText("Pick a state");
    expect(selectElement).toBeInTheDocument();
  });
});
