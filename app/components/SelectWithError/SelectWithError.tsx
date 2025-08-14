import type { ReactElement } from "react";

interface InputWithErrorType {
  name: string;
  labelTitle?: string;
  isRequired?: boolean;
  options: Array<string>;
}

/**
 * This component can be used in forms in palce of bloc <label></label><input />
 * for all input of type text, password, email or number
 * It includes an error message witch displays when HTML5 API validation returns an invalid input
 * placeholder style and message error style are customizable in InputWithError.css file
 * @param {InputWithErrorType} props - component props
 * @param {string} props.name - for both htmlFor of label element and, name and id of input element
 * @param {string} props.labelTitle -optional -  visible label content
 * @param {string} props.errorMessage - optional - the visible error message if input is invalid
 * @param {string} props.type - input type (text, number, email, password)
 * @param {string} props.placeholder - optional - the placeholder to display
 * @param {boolean} props.isRequired - optional - true by default. True if input can't be empty when form is submit
 * @param {number} props.minLength - optional - min length for HTML5 API validation
 * @retrun {ReactElement}
 * */
export default function SelectWithError({
    name = "",
    labelTitle = "",
    isRequired = true,
    options=[]
}: InputWithErrorType): ReactElement {

    function optionElement(text: string, index: number){
        return (
            <option value={index + 1} key={index}>{text}</option>
        )
    }

    return (
        <div className="flex mb-4">
        <label htmlFor={name} className="mr-5">
            {labelTitle}
        </label>
        <div
            className="error"
            data-error="Please choose an element in the list."
        >
            <select
            name={name}
            id={name}
            required={isRequired}
            className="border-mouse border-1 rounded-md pl-4 w-xs"
            >
                <option></option>
                {options.map((optionText, index) => optionElement(optionText, index))}
            </select>
        </div>
        </div>
  );
}