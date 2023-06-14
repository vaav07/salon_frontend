import { useState } from "react";
import AddServicesModal from "../components/AddServicesModal";
import ServicesList from "../components/ServicesList";

import useAuthContext from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import UserLayout from "../layouts/UserLayout";

const Services = () => {
  const { http, config } = useAuthContext();

  let [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => await http.get(`/api/getservices`, config),
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <UserLayout>
      <div className="bg-zinc-200 ">
        {/* <Sidebar /> */}

        <div className=" max-w-5xl m-auto">
          <h1 className="py-6 text-2xl font-bold">SERVICES DETAILS</h1>

          {isLoading ? (
            <h3>Loading..</h3>
          ) : (
            <ServicesList
              openModal={openModal}
              data={data.data.result}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>

      <AddServicesModal closeModal={closeModal} isOpen={isOpen} />
    </UserLayout>
  );
};

export default Services;
