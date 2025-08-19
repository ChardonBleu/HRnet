import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import { useSelector } from "react-redux";
import { getAllEmployees } from "~/store/selectors";
import { EMPLOYEES_TABLE_HEADERS, STATES } from "~/utils/constants";
import DataTable from "~/components/DataTable/DataTable";

export default function Employees() {
  const employees = useSelector(getAllEmployees);

  function stateAbbrevation(employeeState: string) {
    return STATES.filter((state) => state.name === employeeState)[0]
      .abbreviation;
  }

  function employeesForTable() {
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

  return (
    <>
      <Header />
      <main className="flex-1 align-center w-full pl-10 pr-10 flex justify-center">
        <section className="bg-white flex flex-col justify-center items-center rounded-lg w-full max-w-[1480px] lg:mt-10 lg:mb-10 mb-6 mt-6 lg:p-10 p-4 shadow-md ">
          <h2 className="lg:text-2xl sm:text-xl font-bold lg:mb-10 mb-4">
            Current Employee
          </h2>
          <DataTable
            datas={employeesForTable()}
            tableHeaders={EMPLOYEES_TABLE_HEADERS}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
