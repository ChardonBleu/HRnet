import { Form } from "react-router";
import InputWithError from "../InputWithError/InputWithError";
import InputWithDatePickerAndError from "../InputWithDatePicker/InputWithDatePicker";

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

export function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
  const isValidForm = validationForm();
  console.log("isValidForm: " + isValidForm);
}

export default function EmployeeForm() {
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
          name="birthdate"
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

          {/* TODO create reusable components for form parts 
            one for select with props options, error-message
            */}
          <div className="flex mb-4">
            <label htmlFor="state" className="mr-5">
              State:
            </label>
            <div
              className="error"
              data-error="Please choose a state in the list."
            >
              <select
                name="state"
                id="state"
                required
                className="border-mouse border-1 rounded-md pl-4 w-xs text-mouse"
              >
                <option></option>
              </select>
            </div>
          </div>

          <InputWithError
            name="zip-code"
            labelTitle="Zip Code:"
            errorMessage="Please enter at least 5 numbers for the zip code."
            type="number"
            placeholder="56894"
            isRequired={true}
          />
        </fieldset>

        {/* TODO create reusable components for form parts 
            one for select with props options, error-message
        */}
        <div className="flex mb-4">
          <label htmlFor="department" className="mr-5">
            Department:
          </label>
          <div
            className="error"
            data-error="Please choose a department in the list."
          >
            <select
              name="department"
              id="department"
              required
              className="border-mouse border-1 rounded-md pl-4 w-xs text-mouse"
            >
              <option></option>
              <option value="1">Sales</option>
              <option value="2">Marketing</option>
              <option value="3">Engineering</option>
              <option value="4">Human Resources</option>
              <option value="5">Legal</option>
            </select>
          </div>
        </div>

        <input
          className="bg-mouse rounded-md p-2 m-10 shadow-md self-center w-40"
          type="submit"
          value="Save"
        ></input>
      </Form>
    </>
  );
}
