/* eslint-disable react/prop-types */
import { useMemo } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import useAuthContext from "../../../context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import Table from "../../../components/Table";

const AdminServices = () => {
  const { http, adminId, config } = useAuthContext();

  const getServices = async () => {
    return await http.get(`/api/admin/services/${adminId}`, config);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allServices"],
    queryFn: getServices,
  });

  const deleteServiceMU = useMutation({
    mutationFn: async (serviceId) => {
      return await http.delete(`/api/admin/${adminId}/services/${serviceId}`);
    },

    onError: (error) => {
      // An error happened!
      console.log(`rolling back optimistic update with id }`, error);
    },
    onSuccess: (res) => {
      // Boom baby!
      alert("successfully deleted");
      refetch();
    },
  });

  const handleDelete = (value) => {
    deleteServiceMU.mutate(value);
  };

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
      {
        Header: "",
        accessor: "id",
        Cell: ({ value }) => (
          <button
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-1 px-2 rounded"
            onClick={() => handleDelete(value)}
          >
            Delete
          </button>
        ),
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
