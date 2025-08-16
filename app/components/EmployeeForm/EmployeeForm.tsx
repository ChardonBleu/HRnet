import { Form } from "react-router";
import InputWithError from "../InputWithError/InputWithError";
import InputWithDatePickerAndError from "../InputWithDatePicker/InputWithDatePicker";
import SelectWithError from "../SelectWithError/SelectWithError";
import { departments, states } from "~/utils/constants";
import { useDispatch } from "react-redux";
import { employeeAdded } from "~/store/store";
import type { Employee } from "~/store/store";
import type { FormEvent } from "react";
import { nanoid } from "@reduxjs/toolkit";

function displayErrorMessage(
  errorValidation: boolean | undefined,
  errorDiv: Element,
) {
  if (!errorValidation) {
    errorDiv.setAttribute("data-error-visible", "true");
  } else {
    errorDiv.setAttribute("data-error-visible", "false");
  }
}

export function validationForm() {
  let validation = true;
  const allErrors = document.querySelectorAll(".error");

  for (const error of allErrors) {
    let isValidInput = false;
    const input = error.querySelector("input");
    const select = error.querySelector("select");
    if (input) {
      isValidInput = input.checkValidity();
      const isValidZipCode =
        input?.name == "zip-code" && input.value.toString().length < 5
          ? false
          : true;

      displayErrorMessage(isValidInput, error);
      validation = validation && isValidInput && isValidZipCode;
    }
    if (select) {
      const isValidSelect = select.checkValidity();
      displayErrorMessage(isValidSelect, error);
      validation = validation && isValidSelect;
    }
  }
  return validation;
}

export default function EmployeeForm() {
  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValidForm = validationForm();

    if (isValidForm) {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const employeeData = {
        ...data,
        id: nanoid(),
      } as Employee;
      dispatch(employeeAdded(employeeData));
    }
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="text-xl flex flex-col"
        noValidate
        data-testid="employeeForm"
      >
        <InputWithError
          name="firstName"
          labelTitle="First Name:"
          errorMessage="Please enter at least 2 characters for the first name."
          type="text"
          placeholder="Clark"
          minLength={2}
        />
        <InputWithError
          name="lastName"
          labelTitle="Last Name:"
          errorMessage="Please enter at least 2 characters for the last name."
          type="text"
          placeholder="Kent"
          minLength={2}
        />
        <InputWithDatePickerAndError
          name="birthDate"
          labelTitle="Birth Date:"
          placeholder="13/05/1987"
        />
        <InputWithDatePickerAndError
          name="startDate"
          labelTitle="Start Date:"
          placeholder="01/09/2009"
        />

        <fieldset className="border-2 border-anthracite rounded-md p-4 w-md mb-8">
          <legend>Address</legend>
          <InputWithError
            name="street"
            labelTitle="Street:"
            errorMessage="Please enter at least 2 characters for the street."
            type="text"
            placeholder="344 Clinton Street"
            minLength={2}
          />
          <InputWithError
            name="city"
            labelTitle="City:"
            errorMessage="Please enter at least 2 characters for the city."
            type="text"
            placeholder="Metropolis"
            minLength={2}
          />
          <SelectWithError
            name="state"
            labelTitle="State:"
            options={states.map((state) => state.name)}
          />
          <InputWithError
            name="zipCode"
            labelTitle="Zip Code:"
            errorMessage="Please enter at least 5 numbers for the zip code."
            type="number"
            placeholder="56894"
            isRequired={true}
          />
        </fieldset>

        <SelectWithError
          name="department"
          labelTitle="Department:"
          options={departments}
        />

        <input
          className="bg-green-meadow text-white font-bold rounded-md p-2 m-10 shadow-md self-center w-40"
          type="submit"
          value="Save"
        ></input>
      </Form>
    </>
  );
}
