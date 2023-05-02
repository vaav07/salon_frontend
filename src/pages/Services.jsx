import ServicesList from "../components/ServicesList";
import Sidebar from "../components/Sidebar";

const Services = () => {
  return (
    <>
      <div className="bg-zinc-200 h-screen">
        <Sidebar />

        <div className=" max-w-5xl m-auto">
          <h1 className="py-6 text-2xl font-bold">SERVICES DETAILS</h1>
          <ServicesList />
        </div>
      </div>
    </>
  );
};

export default Services;
