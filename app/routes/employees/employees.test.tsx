import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Employees from "./employees";
import { stateAbbrevation, employeesForTable } from "./employees";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "~/store/store";
import type { Employee } from "~/store/store";

describe("Employees list", () => {
  it("renders with title", () => {
    render(
      <MemoryRouter initialEntries={["/employee-list"]}>
        <Provider store={store}>
          <Employees />
        </Provider>
      </MemoryRouter>,
    );
    const title = screen.getByText("Current Employees");
    expect(title).toBeInTheDocument();
  });
});

describe("State abbreviation function", () => {
  it("Return right abreviation for employee state", () => {
    const employeeState = "Alabama";
    const result = stateAbbrevation(employeeState);
    expect(result).toEqual("AL");
  });
});

describe("employeeForTable function", () => {
  it("Return employee tables with state abbreviation", () => {
    const testEmployee = {
      birthDate: "August 12, 2025",
      city: "Metropolis",
      department: "Sales",
      firstName: "Clark",
      id: "2ABRzne3EL87gtgDuOwpr",
      lastName: "Kent",
      startDate: "August 12, 2025",
      state: "Arkansas",
      street: "344 Clinton Street",
      zipCode: "56894",
    } as Employee;
    const employees = vi.fn();
    employees.mockReturnValue([testEmployee, testEmployee, testEmployee]);
    const result = employeesForTable(employees());
    expect(result.length).toEqual(3);
    expect(result[0]).toEqual([
      "Clark",
      "Kent",
      "August 12, 2025",
      "Sales",
      "August 12, 2025",
      "344 Clinton Street",
      "Metropolis",
      "AR",
      "56894",
    ]);
  });
});
