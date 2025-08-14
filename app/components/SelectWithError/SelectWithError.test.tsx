import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SelectWithError from "./SelectWithError";

describe("InputWithError", () => {
  it("renders with props", () => {
    render(
      <SelectWithError
        name="states"
        labelTitle="State:"
        options={["un", "deux"]}
      />,
    );
    const labelElement = screen.getByText("State:");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("for", "states");

    const selectElement = document.getElementById("states")
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveAttribute("name", "states");
    expect(selectElement).toBeRequired();

    const optionElementAll = document.querySelectorAll("option")
    expect(optionElementAll.length).toEqual(3)
    expect(optionElementAll[0].value).toBeFalsy()
    expect(optionElementAll[1].value).toEqual("1")
    expect(optionElementAll[1].innerHTML).toEqual("un")


  });
});