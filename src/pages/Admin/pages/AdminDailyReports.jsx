import { useMemo, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import useAuthContext from "../../../context/AuthContext";

import Table from "../../../components/Table";

const AdminDailyReports = () => {
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const { http, admin, adminId, config } = useAuthContext();

  const handleSubmit = async (e) => {
    console.log(date);
    e.preventDefault();
    const response = await http.get(
      `/api/admin/${adminId}/select-sales-date/${date}`,
      config
    );
    setData(response.data);
    setDate("");
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
        Header: "Store",
        accessor: "username",
      },
      {
        Header: "UPI",
        accessor: "upi_sales",
        Cell: ({ value }) => <span>₹ {parseInt(value)}</span>,
      },
      {
        Header: "Card",
        accessor: "card_sales",
        Cell: ({ value }) => <span>₹ {parseInt(value)}</span>,
      },
      {
        Header: "Cash",
        accessor: "cash_sales",
        Cell: ({ value }) => <span>₹ {parseInt(value)}</span>,
      },
      {
        Header: "Total Sales",
        accessor: "total_sales",
        Cell: ({ value }) => <span>₹ {parseInt(value)}</span>,
      },
    ],
    []
  );

  const reportsData = useMemo(() => data, [data]);

  return (
    <AdminLayout>
      <div>
        <h1 className=" ml-5 text-xl font-bold">Daily Reports</h1>
        <div>
          <div className="mt-2">
            <form onSubmit={handleSubmit} className="ml-5 space-x-4">
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </form>
          </div>
          <div>
            <Table
              columns={columns}
              data={reportsData}
              Header="Daily Reports"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDailyReports;
