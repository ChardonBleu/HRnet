import { Form } from "react-router";
import InputWithError from "../InputWithError/InputWithError";
import InputWithDatePicker from "../InputWithDatePicker/InputWithDatePicker";
import SelectWithError from "../SelectWithError/SelectWithError";
import { DEPARTMENTS, STATES } from "~/utils/constants";
import { useDispatch } from "react-redux";
import { employeeAdded } from "~/store/store";
import type { Employee } from "~/store/store";
import type { FormEvent } from "react";
import { nanoid } from "@reduxjs/toolkit";

/**
 * Displays error message if not input validation
 * @param errorValidation returned validation for the input elemnt
 * @param errorDiv div elemnt where the error message must display
 */
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

/**
 * For each input check validity
 * @returns {boolean} global form validation
 */
export function validationForm(): boolean {
  let validation = true;
  const allErrors = document.querySelectorAll(".error");

  for (const error of allErrors) {
    let isValidInput = false;
    const input = error.querySelector("input");
    const select = error.querySelector("select");
    if (input) {
      isValidInput = input.checkValidity();
      const isValidZipCode =
        input?.name == "zipCode" && input.value.toString().length < 5
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
      window.location.reload();
    }
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="lg:text-xl text-sm sm:text-base flex flex-col text-anthracite"
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
        <InputWithDatePicker
          name="birthDate"
          labelTitle="Birth Date:"
          isRequired={true}
        />
        <InputWithDatePicker
          name="startDate"
          labelTitle="Start Date:"
          isRequired={true}
        />

        <fieldset className="border-2 border-anthracite rounded-md p-4 lg:w-md w-fit mb-8">
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
            options={STATES.map((state) => state.name)}
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
          options={DEPARTMENTS}
        />

        <input
          className="bg-green-meadow text-white font-bold rounded-md p-2 lg:m-10 m-4 shadow-md self-center w-40"
          type="submit"
          value="Save"
        ></input>
      </Form>
    </>
  );
}
