import { describe, it, expect } from "vitest";
import { formatDate } from "./InputWithDatePicker";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InputWithDatePicker from "./InputWithDatePicker";
import { getDateFormattedForCalendarTest } from "../../utils/functions";
import userEvent from "@testing-library/user-event";

describe("InputWithDatePicker", () => {
  it("renders with props", () => {
    render(<InputWithDatePicker name="birthDate" labelTitle="Birth Date:" />);
    const labelElement = screen.getByText("Birth Date:");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("for", "birthDate");

    const inputElement = screen.getByPlaceholderText("aaaa-mm-jj");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("name", "birthDate");
    expect(inputElement).toBeRequired();
    expect(inputElement).toHaveAttribute("id", "birthDate");
  });
});

describe("formatDate function", () => {
  it("returns formated date", () => {
    const today = new Date("2025/03/09");
    const result = formatDate(today);

    expect(result).toEqual("March 09, 2025");
  });
  it("returns nothing if not date", () => {
    const result = formatDate(undefined);

    expect(result).toEqual("");
  });
});

describe("When user click on calendar icon", () => {
  it("opens calendar with current month at current date ", () => {
    render(<InputWithDatePicker name="birthDate" labelTitle="Birth Date:" />);

    const today = new Date();
    const todayString = getDateFormattedForCalendarTest(today);
    const todayDay = today.getDate();

    const calendarIcon = screen.getByTestId("calendarIcon");

    fireEvent.click(calendarIcon);

    const calendar = screen.getByTestId("calendar");
    expect(calendar).toBeInTheDocument();

    const todayButton = screen.getByRole("button", {
      name: "Today, " + todayString + ", selected",
    });
    expect(todayButton).toBeInTheDocument();
    expect(todayButton.innerHTML).toEqual(todayDay.toString());
  });
});

describe("When user type a date in the input", () => {
  it("displays the date in input and update input value", async () => {
    render(<InputWithDatePicker name="birthDate" labelTitle="Birth Date:" />);

    const birthDateInput = screen.getByLabelText(/Birth Date/i);
    await userEvent.clear(birthDateInput);
    await userEvent.type(birthDateInput, "1972-03-09");
    fireEvent.mouseOut(birthDateInput);

    await waitFor(() => {
      expect(birthDateInput).toHaveValue("March 09, 1972");
    });
  });
});
