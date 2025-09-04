import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import { useSelector } from "react-redux";
import { getAllEmployees } from "~/store/selectors";
import { EMPLOYEES_TABLE_HEADERS, STATES } from "~/utils/constants";
import { DataTable } from "@chardonbleu/react-data-table";
import type { Employee } from "~/store/store";

export function stateAbbrevation(employeeState: string) {
  return STATES.filter((state) => state.name === employeeState)[0].abbreviation;
}

export function employeesForTable(employees: Employee[]): Array<Array<string>> {
  return employees.map((employee) => [
    employee.firstName,
    employee.lastName,
    employee.startDate,
    employee.department,
    employee.birthDate,
    employee.street,
    employee.city,
    stateAbbrevation(employee.state),
    employee.zipCode,
  ]);
}

export default function Employees() {
  const employees = useSelector(getAllEmployees);

  const theme = {
    primaryColor: "#212121",
    backgroundColor: "#e5e7eb",
    accentColor: "#6e8711",
  };

  return (
    <>
      <Header />
      <main className="flex-1 align-center w-full pl-10 pr-10 flex justify-center">
        <section className="bg-white h-fit flex flex-col justify-center items-center rounded-lg w-full max-w-[1480px] lg:mt-10 lg:mb-10 mb-6 mt-6 lg:p-10 p-4 shadow-md">
          <h2 className="lg:text-2xl sm:text-xl font-bold lg:mb-10 mb-4">
            Current Employees
          </h2>
          <DataTable
            datas={employeesForTable(employees)}
            tableHeaders={EMPLOYEES_TABLE_HEADERS}
            theme={theme}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
