import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { InfoDialog } from "./InfoDialog";

const setShowModal = vi.fn();

describe("InfoDialog", () => {
  it("renders with all props when showModal true", () => {
    render(
      <InfoDialog
        showModal={true}
        setShowModal={setShowModal}
        modalTitle="Ma modale"
        modalText="Nice modal text"
      />,
    );

    const modalText = screen.getByText("Nice modal text");
    expect(modalText).toBeInTheDocument();
    const modalTitle = screen.getByText("Ma modale");
    expect(modalTitle).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });
  it("renders without optional props when showModal true", () => {
    render(
      <InfoDialog
        showModal={true}
        setShowModal={setShowModal}
        modalTitle="Ma modale"
      />,
    );

    const modalTitle = screen.getByText("Ma modale");
    expect(modalTitle).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });
  it("don't renders when showModal true", () => {
    render(
      <InfoDialog
        showModal={false}
        setShowModal={setShowModal}
        modalTitle="Ma modale"
        modalText="Nice modal text"
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("doit appeler window.location.reload quand le bouton Close est cliqué", () => {
    render(
      <InfoDialog
        showModal={true}
        setShowModal={setShowModal}
        modalTitle="Test Title"
        modalText="Test text"
      />,
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    expect(setShowModal).toHaveBeenCalledTimes(1);
  });
});
