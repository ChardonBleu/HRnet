import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import { useSelector } from "react-redux";
import { getAllEmployees } from "~/store/selectors";
import type { Employee } from "~/store/store";

export default function Employees() {
  const employees = useSelector(getAllEmployees);

  function EmployeeRow({ employee }: { employee: Employee }) {
    return (
      <section key={employee.id} className="flex gap-4">
        <h2>{employee.lastName}</h2>
        <p>{employee.firstName}</p>
        <div>{employee.birthDate}</div>
      </section>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="m-10">
          <h2 className="lg:text-2xl text-xl font-bold mb-10">
            Employees list
          </h2>
          <div className="min-h-full flex flex-col">
            {employees.map((employee) => {
              return <EmployeeRow key={employee.id} employee={employee} />;
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
