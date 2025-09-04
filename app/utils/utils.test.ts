import { describe, it, expect } from "vitest";
import { getDateFormattedForCalendarTest } from "./functions";

describe("function getDateFormattedForCalendarTest", () => {
  it("return weel formated date", () => {
    const dateThird = new Date("2025/09/03");
    expect(getDateFormattedForCalendarTest(dateThird)).toEqual(
      "Wednesday, September 3rd, 2025",
    );

    const dateFirst = new Date("2025/09/01");
    expect(getDateFormattedForCalendarTest(dateFirst)).toEqual(
      "Monday, September 1st, 2025",
    );

    const dateSecond = new Date("2025/09/02");
    expect(getDateFormattedForCalendarTest(dateSecond)).toEqual(
      "Tuesday, September 2nd, 2025",
    );

    const dateFourth = new Date("2025/09/04");
    expect(getDateFormattedForCalendarTest(dateFourth)).toEqual(
      "Thursday, September 4th, 2025",
    );

    const date25 = new Date("2025/09/25");
    expect(getDateFormattedForCalendarTest(date25)).toEqual(
      "Thursday, September 25th, 2025",
    );
  });
});
