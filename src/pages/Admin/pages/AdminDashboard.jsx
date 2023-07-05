import { useQuery } from "@tanstack/react-query";
import Card from "../../../components/Card";
import useAuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../layouts/AdminLayout";
import NewCard from "../components/NewCard";
import { useState } from "react";
import EditModal from "../../../components/EditModal";

const AdminDashboard = () => {
  const { http, admin, adminId, config } = useAuthContext();

  let [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  console.log(id);
  function closeModal() {
    setIsOpen(false);
    setId(null);
  }

  function openModal(uId) {
    setIsOpen(true);
    setId(uId);
  }

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
                    setId={setId}
                    openModal={openModal}
                    userId={item.user_id}
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

      <EditModal id={id} isOpen={isOpen} closeModal={closeModal} />
    </AdminLayout>
  );
};

export default AdminDashboard;
