import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import { useSelector } from 'react-redux'
import { getAllEmployees, loadAndRestoreState } from "~/store/store";
import { useEffect } from "react";


export default function Employees() {
  
  const employees = useSelector(getAllEmployees)
  console.log(employees)
  
  return (
    <>
      <Header />
      <main>
        <section>
          <h2>Employees list</h2>
          <div>
            {
              employees.map((employee) => {employee.firstName})
            }
            
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
