import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import EmployeeForm from "./EmployeeForm";
import Home from "../..//routes/home/home";
import { store } from "~/store/store";
import userEvent from "@testing-library/user-event";

describe("EmployeeForm", () => {
  const renderEmployeeForm = () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <EmployeeForm />,
        },
      ],
      {
        initialEntries: ["/"],
      },
    );

    return render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
  };

  it("renders form", () => {
    renderEmployeeForm();

    const formElement = screen.getByTestId("employeeForm");
    expect(formElement).toBeInTheDocument();
  });
  it("prevents submission when form is invalid", () => {
    renderEmployeeForm();

    const submitButton = screen.getByText("Save");

    const errorElements = document.querySelectorAll(
      '.error[data-error-visible="true"]',
    );
    expect(errorElements.length).toBe(0);

    fireEvent.click(submitButton);

    const visibleErrors = document.querySelectorAll(
      '.error[data-error-visible="true"]',
    );
    expect(visibleErrors.length).toBeGreaterThan(0);

    const firstNameError = document.querySelector(
      '.error input[name="firstName"]',
    )?.parentElement;
    expect(firstNameError).toHaveAttribute("data-error-visible", "true");
  });
  it("Don't show error messages submission when input is valid", async () => {
    renderEmployeeForm();

    const firstNameInput = screen.getByLabelText(/first name/i);
    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, "Marianne");

    const lastNameInput = screen.getByLabelText(/last name/i);
    await userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, "Durand");

    const submitButton = screen.getByText("Save");

    const errorElements = document.querySelectorAll(
      '.error[data-error-visible="true"]',
    );
    expect(errorElements.length).toBe(0);

    fireEvent.click(submitButton);

    const visibleErrors = document.querySelectorAll(
      '.error[data-error-visible="false"]',
    );
    expect(visibleErrors.length).toBe(2);

    const firstNameError = document.querySelector(
      '.error input[name="firstName"]',
    )?.parentElement;
    expect(firstNameError).toHaveAttribute("data-error-visible", "false");
  });
});

describe("When user fill valid form and submit it", () => {
  const renderHome = () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Home />,
        },
      ],
      {
        initialEntries: ["/"],
      },
    );

    return render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
  };
  it("renders confirmation modal", async () => {
    renderHome();

    const firstNameInput = screen.getByLabelText(/first name/i);
    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, "Marianne");

    const lastNameInput = screen.getByLabelText(/last name/i);
    await userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, "Dupont");

    const birthDateInput = screen.getByLabelText(/Birth Date/i);
    await userEvent.clear(birthDateInput);
    await userEvent.type(birthDateInput, "1972-03-09");

    const startDateInput = screen.getByLabelText(/Start Date/i);
    await userEvent.clear(startDateInput);
    await userEvent.type(startDateInput, "2022-02-03");

    const streetInput = screen.getByLabelText(/Street/i);
    await userEvent.clear(streetInput);
    await userEvent.type(streetInput, "1278 Tests road");

    const cityInput = screen.getByLabelText(/City/i);
    await userEvent.clear(cityInput);
    await userEvent.type(cityInput, "Metropolis");

    const stateSelect = screen.getByTestId("state");
    fireEvent.click(stateSelect);

    const stateOption = screen.getByTestId("Alabama");
    fireEvent.click(stateOption);

    const zipCodeInput = screen.getByLabelText(/zip Code/i);
    await userEvent.clear(zipCodeInput);
    await userEvent.type(zipCodeInput, "123568");

    const departmentSelect = screen.getByTestId("department");
    fireEvent.click(departmentSelect);

    const departmentOption = screen.getByTestId("Sales");
    fireEvent.click(departmentOption);

    const submitButton = screen.getByText("Save");
    fireEvent.click(submitButton);

    const modalTitle = await screen.findByText("employee created!");
    expect(modalTitle).toBeInTheDocument();
  });
});
