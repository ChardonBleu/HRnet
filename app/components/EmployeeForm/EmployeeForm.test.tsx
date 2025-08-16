import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { Provider } from 'react-redux';
import EmployeeForm from './EmployeeForm';
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
      </Provider>
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
