import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../layouts/AdminLayout";
import { useMemo } from "react";
import Table from "../../../components/Table";

const AdminEmployees = () => {
  const { http, adminId, config } = useAuthContext();

  const getEmployees = async () => {
    return await http.get(`/api/admin/employees/${adminId}`, config);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["allEmployees"],
    queryFn: getEmployees,
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
        Header: "Employee Name",
        accessor: "fullname",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone_no",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Date of Joining",
        accessor: "date_of_joining",
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

  const employeeData = useMemo(() => data?.data, [data?.data]);

  return (
    <AdminLayout>
      <div className="">
        <h1 className="ml-5 font-bold text-xl">All Employees</h1>
        <div>
          {isLoading ? (
            <h3>Loading...</h3>
          ) : (
            <Table columns={columns} data={employeeData} Header="Employees" />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEmployees;
