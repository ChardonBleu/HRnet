import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import EmployeeForm from "~/components/EmployeeForm/EmployeeForm";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-white flex flex-col justify-center items-center rounded-lg lg:w-4xl md:w-2xl lg:mt-10 lg:mb-10 mb-6 mt-6 lg:p-10 p-4 shadow-md ">
          <h2
            className="font-[Raleway] lg:text-2xl sm:text-xl font-bold lg:mb-10 mb-4"
            data-testid="home-title"
          >
            Create Employee Form
          </h2>
          <EmployeeForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
