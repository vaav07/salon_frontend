/* eslint-disable react/prop-types */
import { useMemo } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import useAuthContext from "../../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Table from "../../../components/Table";

const AdminServices = () => {
  const { http, adminId, config } = useAuthContext();

  const getServices = async () => {
    return await http.get(`/api/admin/services/${adminId}`, config);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["allServices"],
    queryFn: getServices,
  });

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
        Header: "Service Name",
        accessor: "service_name",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => <p>₹ {parseInt(value)}</p>,
      },

      // {
      //   Header: "",
      //   accessor: "id",
      //   Cell: ({ value }) => (
      //     <button
      //       className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-1 px-2 rounded"
      //       onClick={() => handleButtonClick(value)}
      //     >
      //       View
      //     </button>
      //   ),
      // },
    ],
    []
  );

  const serviceData = useMemo(() => data?.data, [data?.data]);

  return (
    <AdminLayout>
      <div className="">
        <h1 className="ml-5 font-bold text-xl">Services</h1>
        <div>
          {isLoading ? (
            <h3>Loading...</h3>
          ) : (
            <div className="w-3/4 mx-auto">
              <Table columns={columns} data={serviceData} Header="Services" />
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
