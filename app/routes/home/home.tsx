import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import EmployeeForm from "~/components/EmployeeForm/EmployeeForm";

export default function Home() {
  return (
    <>
      <Header />
      <main  className="h-full">
        <section className="bg-white flex flex-col justify-center items-center rounded-lg w-4xl m-10 p-10 shadow-md ">
          <h2 className="text-2xl font-bold mb-10">Create Employee Form</h2>
          <EmployeeForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
