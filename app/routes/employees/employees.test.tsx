import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Employees from "./employees";
import { MemoryRouter } from "react-router";

describe("Employees", () => {
  it("renders with title", () => {
    render(
      <MemoryRouter initialEntries={["/employee-list"]}>
        <Employees />
      </MemoryRouter>,
    );
    const title = screen.getByText("Employees list");
    expect(title).toBeInTheDocument();
  });
});
