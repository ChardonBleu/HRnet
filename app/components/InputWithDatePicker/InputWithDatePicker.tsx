import type { ReactElement } from "react";

interface InputWithDatePickerType {
  name: string;
  labelTitle: string;
  placeholder?: string;
  isRequired?: boolean;
}

/**
 * This component can be used in forms in palce of bloc <label></label><input />
 * for all input of type date
 * It includes an error message witch displays when HTML5 API validation returns an invalid input
 * placeholder style and message error style are customizable in InputWithError.css file
 * @param {InputWithDatePickerType} props - component props
 * @param {string} props.name - for both htmlFor of label element and, name and id of input element
 * @param {string} props.labelTitle -optional -  visible label content
 * @param {string} props.placeholder - optional - the placeholder to display
 * @param {boolean} props.isRequired - optional - true by default. True if input can't be empty when form is submit
 * @retrun {ReactElement}
 * */
export default function InputWithDatePickerAndError({
  name,
  labelTitle,
  placeholder,
  isRequired = true,
}: InputWithDatePickerType): ReactElement {
  return (
    <div className="flex lg:mb-4">
      <label htmlFor={name} className="mr-5">
        {labelTitle}
      </label>
      <div className="error" data-error="Please choose a date in the calendar.">
        <input
          type="date"
          name={name}
          id={name}
          placeholder={placeholder}
          required={isRequired}
          className="border-mouse border-1 rounded-md pl-4"
        />
      </div>
    </div>
  );
}
