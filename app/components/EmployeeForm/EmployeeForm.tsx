import { Form } from "react-router";


export default function Footer() {

    function displayErrorMessage(errorValidation: boolean | undefined, errorDiv: Element ) {
        if (!errorValidation) {
            errorDiv.setAttribute("data-error-visible", "true");
        } else {
            errorDiv.setAttribute("data-error-visible", "false");
        }
}
    function validationForm() {
        const validation = true;
        const allErrors = document.querySelectorAll(".error");

        for (const error of allErrors) {
            const input = error.querySelector("input");
            const inputValidation = input?.checkValidity()
            displayErrorMessage(inputValidation, error);

        }
        return validation;
    }


    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const isValidForm = validationForm();
        console.log(isValidForm)
    }

    return (
        <>
        <Form onSubmit={handleSubmit} className="text-xl flex flex-col" noValidate>
            {/* TODO create reusable components for form parts 
            one for inputs with props flag, error-message, type, placeholder
            one for date with extenal library
            one for select with props options, error-message
            */}
            <div className="flex mb-4">
                <label htmlFor="firstName" className="mr-5">
                    First Name:
                </label>
                <div
                className="error"
                data-error="Please enter at least 2 characters for the first name."
                >
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    minLength={2}
                    placeholder="Clark"
                    required
                    className="border-mouse border-1 rounded-md pl-4"
                />
                </div>
            </div>
            <div className="flex mb-4">
                <label htmlFor="lastName" className="mr-5">
                    Last Name:
                </label>
                <div
                className="error"
                data-error="Please enter at least 2 characters for the last name."
                >
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    minLength={2}
                    placeholder="Kent"
                    required
                    className="border-mouse border-1 rounded-md pl-4"
                />
                </div>
            </div>

            <div className="flex mb-4">
                <label htmlFor="birthDate" className="mr-5">
                    Birth Date:
                </label>
                <div
                className="error"
                data-error="Please choose a date in the calendar."
                >
                <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    placeholder="13/05/1987"
                    required
                    className="border-mouse border-1 rounded-md pl-4"
                />
                </div>
            </div>
            <div className="flex mb-4">
                <label htmlFor="startDate" className="mr-5">
                    Start Date:
                </label>
                <div
                className="error"
                data-error="Please choose a date in the calendar."
                >
                <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    placeholder="01/09/2009"
                    required
                    className="border-mouse border-1 rounded-md pl-4"
                />
                </div>
            </div>
            <fieldset className="border-2 border-anthracite rounded-md p-4 w-md mb-8">
                <legend>Address</legend>
                <div className="flex mb-4">
                    <label htmlFor="street" className="mr-5">
                        Street:
                    </label>
                    <div
                    className="error"
                    data-error="Please enter at least 2 characters for the street."
                    >
                    <input
                        type="text"
                        name="street"
                        id="street"
                        minLength={2}
                        placeholder="344 Clinton Street"
                        required
                        className="border-mouse border-1 rounded-md pl-4"
                    />
                    </div>
                </div>
                <div className="flex mb-4">
                    <label htmlFor="city" className="mr-5">
                        City:
                    </label>
                    <div
                    className="error"
                    data-error="Please enter at least 2 characters for the city."
                    >
                    <input
                        type="text"
                        name="city"
                        id="city"
                        minLength={2}
                        placeholder="Metropolis"
                        required
                        className="border-mouse border-1 rounded-md pl-4"
                    />
                    </div>
                </div>
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
                        <option value="" disabled selected hidden>Delaware</option>
                    </select>
                    </div>
                </div>
                <div className="flex mb-4">
                    <label htmlFor="zip-code" className="mr-5">
                        Zip Code:
                    </label>
                    <div
                    className="error"
                    data-error="Please enter at least 5 numbers for the zip code."
                    >
                    <input
                        type="number"
                        name="zip-code"
                        id="zip-code"
                        minLength={4}
                        placeholder="56894"
                        required
                        className="border-mouse border-1 rounded-md pl-4"
                    />
                    </div>
                </div>
            </fieldset>
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
            >                
            </input>
        </Form>
        </>
    );
}
