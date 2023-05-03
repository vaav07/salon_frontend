import { useState } from "react";
import AddServicesModal from "../components/AddServicesModal";
import ServicesList from "../components/ServicesList";
import Sidebar from "../components/Sidebar";

const Services = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="bg-zinc-200 h-screen">
        <Sidebar />

        <div className=" max-w-5xl m-auto">
          <h1 className="py-6 text-2xl font-bold">SERVICES DETAILS</h1>
          <ServicesList openModal={openModal} />
        </div>
      </div>

      <AddServicesModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default Services;
