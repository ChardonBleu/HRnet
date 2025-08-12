import { NavLink } from "react-router";

export default function Header() {
  function LinkColor(isActive: boolean, isPending: boolean) {
    return isActive
      ? "underline underline-offset-4 decoration-green-apple decoration-solid decoration-2"
      : isPending
        ? "text-green-apple"
        : "";
  }

  return (
    <>
      <header className="flex justify-between items-center w-full bg-white pr-10 pl-10 pt-2 pb-2 text">
        <h1>
          <img src="/hrnet_logo.png" alt="App logo" />
          <span className="sr-only">HRnet</span>
        </h1>
        <nav className="flex justify-center gap-10 text-xl">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              LinkColor(isActive, isPending)
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/employee-list"
            className={({ isActive, isPending }) =>
              LinkColor(isActive, isPending)
            }
          >
            Employees
          </NavLink>
        </nav>
      </header>
    </>
  );
}
