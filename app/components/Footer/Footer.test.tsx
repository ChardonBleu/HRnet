import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { MemoryRouter } from "react-router";

describe("Header", () => {
  it("renders with logo", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByAltText("Wealth Health")).toBeTruthy();
  });
});
