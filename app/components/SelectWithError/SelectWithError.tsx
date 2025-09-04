import { type ReactElement } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

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
  options = [],
}: InputWithErrorType): ReactElement {
  function selectItemElement(text: string, index: number) {
    return (
      <SelectItem
        value={text}
        key={index}
        className="lg:text-xl text-sm sm:text-base"
        data-testid={text}
      >
        {text}
      </SelectItem>
    );
  }

  return (
    <div className="flex lg:mb-4" data-testid="select">
      <label htmlFor={name} className="mr-5">
        {labelTitle}
      </label>
      <div className="error" data-error="Please choose an element in the list.">
        <Select name={name} required={isRequired}>
          <SelectTrigger
            className="w-[280px] lg:text-xl text-sm sm:text-base"
            data-testid={name}
          >
            <SelectValue placeholder={"Pick a " + name} />
          </SelectTrigger>
          <SelectContent>
            {options.map((optionText, index) =>
              selectItemElement(optionText, index),
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
