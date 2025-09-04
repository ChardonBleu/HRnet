import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";
import { MemoryRouter } from "react-router";

describe("Header", () => {
  it("renders with logo", () => {
    render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading ...")).toBeTruthy();
  });
});
