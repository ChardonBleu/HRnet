import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import Home from "./home";
import { Provider } from "react-redux";
import { store } from "~/store/store";

describe("Home", () => {
  it("renders with title", () => {
    // Créer un router en mémoire avec la route
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Home />,
        },
      ],
      {
        initialEntries: ["/"],
      },
    );

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    const title = screen.getByText("Create Employee Form");
    expect(title).toBeInTheDocument();
  });
});
