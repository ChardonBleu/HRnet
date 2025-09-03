import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import Home from "../../routes/home/home";
import Employees from "../../routes/employees/employees";
import { MemoryRouter, createMemoryRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "~/store/store";

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

describe("When user is on home page and click on employee nav link", () => {
  it("user goes to the employee list page", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/employee-list",
          element: <Employees />,
        },
      ],
      {
        initialEntries: ["/"],
      },
    );

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
    const EmployeesButton = screen.getByText("Employees");
    fireEvent.click(EmployeesButton);

    const titlePage = screen.getByText("Current Employees");
    expect(titlePage).toBeInTheDocument();
  });
});

describe("When user is on employee list page and click on home nav link", () => {
  it("user goes to the home page", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/employee-list",
          element: <Employees />,
        },
      ],
      {
        initialEntries: ["/employee-list"],
      },
    );

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
    const EmployeesButton = screen.getByText("Home");
    fireEvent.click(EmployeesButton);

    const titlePage = screen.getByText("Create Employee Form");
    expect(titlePage).toBeInTheDocument();
  });
});
