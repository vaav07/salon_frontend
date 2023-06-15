import { useQuery } from "@tanstack/react-query";
import Card from "../../../components/Card";
import useAuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../layouts/AdminLayout";
import NewCard from "../components/NewCard";

const AdminDashboard = () => {
  const { http, admin, adminId, config } = useAuthContext();

  const statsPerAdmin = useQuery({
    queryKey: ["statsPerAdmin"],
    queryFn: async () =>
      await http.get(`/api/admin/${adminId}/user-stats`, config),
  });

  const dailySales = useQuery({
    queryKey: ["dailysales"],
    queryFn: async () =>
      await http.get(`/api/admin/${adminId}/daily-sales`, config),
  });

  const pastMonth = useQuery({
    queryKey: ["pastmonthsales"],
    queryFn: async () =>
      await http.get(`/api/admin/${adminId}/past-month-sales`, config),
  });

  return (
    <AdminLayout>
      <div className="ml-4">
        <div className="text-xl font-bold">Dashboard</div>

        <div className="mt-2 space-y-2">
          <h1 className="font-bold">Overall</h1>
          {statsPerAdmin.isLoading ? (
            <h3 className="mt-2">Loading...</h3>
          ) : (
            <div className="mt-2 grid grid-cols-4 gap-4">
              {statsPerAdmin.data.data.length <= 0 ? (
                <div>No Data</div>
              ) : (
                statsPerAdmin.data.data.map((item) => (
                  <NewCard
                    key={item.username}
                    username={item.username}
                    customerCount={item.customer_count}
                    employeeCount={item.employee_count}
                    salesCount={item.sales_count}
                  />
                ))
              )}
            </div>
          )}
        </div>

        <div className="mt-2 space-y-2">
          <h1 className="font-bold">Daily Sales</h1>
          {dailySales.isLoading ? (
            <h3 className="mt-2">Loading...</h3>
          ) : (
            <div className="mt-2 grid grid-cols-4 gap-4">
              {dailySales.data.data.length <= 0 ? (
                <div>No Data</div>
              ) : (
                dailySales.data.data.map((item) => (
                  <Card
                    key={item.username}
                    name={item.username}
                    data={item.total_sales}
                  />
                ))
              )}
            </div>
          )}
        </div>

        <div className="mt-2">
          <h1 className="font-bold">Past Month Sales</h1>
          {pastMonth.isLoading ? (
            <h3 className="mt-2">Loading...</h3>
          ) : (
            <div className="mt-2 grid grid-cols-4 gap-4">
              {pastMonth.data.data.length <= 0 ? (
                <div>No Data </div>
              ) : (
                pastMonth.data.data.map((item) => (
                  <Card
                    key={item.username}
                    name={item.username}
                    data={item.total_sales}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
