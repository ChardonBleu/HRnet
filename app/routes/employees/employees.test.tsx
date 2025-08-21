import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Employees from "./employees";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "~/store/store";

describe("Employees", () => {
  it("renders with title", () => {
    render(
      <MemoryRouter initialEntries={["/employee-list"]}>
        <Provider store={store}>
          <Employees />
        </Provider>
      </MemoryRouter>,
    );
    const title = screen.getByText("Current Employees");
    expect(title).toBeInTheDocument();
  });
});
