import useAuthContext from "../context/AuthContext";
import DashboardCard from "../components/DashboardCard";
import Sidebar from "../components/Sidebar";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { http, user, userId, config } = useAuthContext();

  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => await http.get(`/api/statistics/${userId}`, config),
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      {user && (
        <div className="bg-zinc-200 h-screen">
          <Sidebar />
          <div className=" max-w-5xl mx-auto">
            <h1 className="py-6 text-2xl font-bold">Dashboard</h1>
            {/* <div>{user?.name}</div> */}
            <div className="flex flex-col md:flex-row md:flex-wrap ">
              <DashboardCard
                item={"EMPLOYEES"}
                data={data.data.employee_count}
              />
              <DashboardCard
                item={"CUSTOMERS"}
                data={data.data.customer_count}
              />
              <DashboardCard item={"SERVICES"} data={data.data.service_count} />
              <DashboardCard item={"REPORTS"} data={data.data.sale_count} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
