"use client";
import { useState, type ReactElement } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

interface InputWithDatePickerType {
  name: string;
  labelTitle: string;
  isRequired?: boolean;
}

/**
 * Based on Shadcn Calendar and Popover components
 * This component can be used in forms in palce of bloc <label></label><input />
 * for all input of type date
 * It includes an error message witch displays when HTML5 API validation returns an invalid input
 * placeholder style and message error style are customizable in InputWithError.css file
 * @param {InputWithDatePickerType} props - component props
 * @param {string} props.name - for both htmlFor of label element and, name and id of input element
 * @param {string} props.labelTitle -optional -  visible label content
 * @param {boolean} props.isRequired - optional - true by default. True if input can't be empty when form is submit
 * @retrun {ReactElement}
 * */
export default function InputWithDatePicker({
  name,
  labelTitle,
  isRequired = true,
}: InputWithDatePickerType): ReactElement {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [date, setDate] = useState<Date | undefined>(today);
  const [month, setMonth] = useState<Date | undefined>(date);

  return (
    <div className="flex lg:mb-4">
      <label htmlFor={name} className="mr-5">
        {labelTitle}
      </label>
      <div className="error" data-error="Please choose a date in the calendar.">
        <div className="relative flex gap-2">
          <input
            type="text"
            id={name}
            name={name}
            value={value}
            placeholder="aaaa-mm-jj"
            className="border-mouse border-1 rounded-md pl-4"
            required={isRequired}
            onChange={(e) => {
              setValue(e.currentTarget.value);
              const date = new Date(e.currentTarget.value);
              if (date) {
                setDate(date);
                setMonth(date);
              }
            }}
            onMouseOut={(e) => {
              if (e.currentTarget.value) {
                setValue(formatDate(date));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpen(true);
              }
            }}
          />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-picker"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <CalendarIcon className="size-5" />
                <span className="sr-only">Select date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  setDate(date);
                  setValue(formatDate(date));
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
