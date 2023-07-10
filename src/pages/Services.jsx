import { useMemo, useState } from "react";
import AddServicesModal from "../components/AddServicesModal";
import ServicesList from "../components/ServicesList";

import useAuthContext from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import UserLayout from "../layouts/UserLayout";
import Table from "../components/Table";

const Services = () => {
  const { http, config, userId } = useAuthContext();

  let [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => await http.get(`/api/getservices/${userId}`, config),
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const columns = useMemo(
    () => [
      {
        Header: "No.",
        accessor: "",
        Cell: ({ row }) => {
          const { index } = row;
          return <span>{index + 1}</span>;
        },
      },

      {
        Header: "Employee Name",
        accessor: "service_name",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => <span>₹ {parseInt(value)}</span>,
      },
    ],
    []
  );

  const servicesData = useMemo(() => data?.data?.result, [data?.data?.result]);

  return (
    <UserLayout>
      <div className="bg-zinc-200 ">
        {/* <Sidebar /> */}

        <div className=" max-w-5xl m-auto">
          <div className="">
            <h1 className="py-6 text-2xl font-bold">SERVICES DETAILS</h1>
          </div>

          {isLoading ? (
            <h3>Loading..</h3>
          ) : (
            <div className="w-3/4 mx-auto">
              <div className="text-sm  text-end mr-10 ">
                <button
                  onClick={openModal}
                  className=" text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                >
                  ADD SERVICES
                </button>
              </div>
              <Table columns={columns} data={servicesData} Header="Services" />
            </div>
          )}
        </div>
      </div>

      <AddServicesModal closeModal={closeModal} isOpen={isOpen} />
    </UserLayout>
  );
};

export default Services;
