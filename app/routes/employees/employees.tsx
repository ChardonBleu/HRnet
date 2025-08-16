import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import { useSelector } from "react-redux";
import { getAllEmployees } from "~/store/selectors";

export default function Employees() {
  const employees = useSelector(getAllEmployees);

  return (
    <>
      <Header />
      <main className="h-full">
        <section className="m-10">
          <h2 className="text-2xl font-bold mb-10">Employees list</h2>
          <div className="min-h-full">
            {employees.map((employee) => {
              return <div key={employee.id}>{employee.firstName}</div>;
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
