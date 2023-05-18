import { useEffect, useState } from "react";
import AddServicesModal from "../components/AddServicesModal";
import ServicesList from "../components/ServicesList";
import Sidebar from "../components/Sidebar";
import useAuthContext from "../context/AuthContext";

const Services = () => {
  const { http, config } = useAuthContext();

  const [services, setServices] = useState([]);
  let [isOpen, setIsOpen] = useState(false);

  const getServices = async () => {
    try {
      const response = await http.get(`/api/getservices`, config);
      const data = response.data.result;
      setServices(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getServices();
    // getUser();
  }, []);

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
          <ServicesList openModal={openModal} data={services} />
        </div>
      </div>

      <AddServicesModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default Services;
