import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router";

describe("Header", () => {
  it("renders with logo", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByAltText("App logo")).toBeTruthy();
  });
  it("applies active style to the Home link when on the home page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>,
    );
    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveClass(
      "underline underline-offset-4 decoration-green-apple decoration-solid decoration-2",
    );
    expect(homeLink).not.toHaveClass("text-green-apple");

    const employeesLink = screen.getByText("Employees");
    expect(employeesLink).not.toHaveClass(
      "underline underline-offset-4 decoration-green-apple decoration-solid decoration-2",
    );
    expect(employeesLink).not.toHaveClass("text-green-apple");
  });

  it("applies active style to the Employees link when on the employees page", () => {
    render(
      <MemoryRouter initialEntries={["/employee-list"]}>
        <Header />
      </MemoryRouter>,
    );
    const employeesLink = screen.getByText("Employees");
    expect(employeesLink).toHaveClass(
      "underline underline-offset-4 decoration-green-apple decoration-solid decoration-2",
    );
    expect(employeesLink).not.toHaveClass("text-green-apple");

    const homeLink = screen.getByText("Home");
    expect(homeLink).not.toHaveClass(
      "underline underline-offset-4 decoration-green-apple decoration-solid decoration-2",
    );
    expect(homeLink).not.toHaveClass("text-green-apple");
  });
});
