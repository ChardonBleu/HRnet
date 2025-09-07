import { useEffect } from "react";
import { NavLink } from "react-router";

export default function Header() {
  function linkColor(isActive: boolean, isPending: boolean) {
    return isActive
      ? "underline underline-offset-4 decoration-green-apple decoration-solid decoration-2"
      : isPending
        ? "text-green-apple"
        : "";
  }

  useEffect(() => {
    // const body = document.querySelector("body")
    // body?.classList.add("body-dark")
  }, []);

  return (
    <>
      <header className="flex justify-between items-center w-full bg-white pr-4 pl-4 lg:pr-10 lg:pl-10 pt-2 pb-2">
        <h1 className="w-32 lg:w-52">
          <img
            fetchPriority="high"
            src="/hrnet_logo.webP"
            alt="App logo"
            width="200"
            height="70"
          />
          <span className="sr-only">HRnet</span>
        </h1>
        <nav
          className="flex justify-center gap-10 lg:text-xl"
          data-testid="header-links"
        >
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              `${linkColor(isActive, isPending)} hover:text-green-moss`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/employee-list"
            className={({ isActive, isPending }) =>
              `${linkColor(isActive, isPending)} hover:text-green-moss`
            }
          >
            Employees
          </NavLink>
        </nav>
      </header>
    </>
  );
}
