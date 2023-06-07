import useAuthContext from "../context/AuthContext";
import DashboardCard from "../components/DashboardCard";
import Sidebar from "../components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const Dashboard = () => {
  const { http, user, userId, config } = useAuthContext();

  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => await http.get(`/api/statistics/${userId}`, config),
  });

  return (
    <>
      {user && (
        <div className=" h-screen">
          <Sidebar />
          <div className=" max-w-5xl mx-auto">
            <h1 className="py-4 text-2xl font-bold">Dashboard</h1>
            {/* <div>{user?.name}</div> */}

            {isLoading ? (
              <h3>Loading...</h3>
            ) : (
              <div>
                <div className="flex justify-between ml-2 items-center">
                  <Card
                    name={"OVERALL SALES"}
                    data={data.data.overallSalesAmount}
                  />
                  <Card name={"CASH AMOUNT"} data={data.data.cashSalesAmount} />
                  <Card name={"UPI AMOUNT"} data={data.data.upiSalesAmount} />
                  <Card name={"CARD AMOUNT"} data={data.data.cardSalesAmount} />
                </div>
                <div className="grid md:grid-cols-2 mt-2 ml-[-14px] ">
                  <Link className="w-full" to="/employee">
                    <DashboardCard
                      item={"EMPLOYEES"}
                      data={data.data.employee_count}
                    />
                  </Link>
                  <Link className="w-full" to="/customer">
                    <DashboardCard
                      item={"CUSTOMERS"}
                      data={data.data.customer_count}
                    />
                  </Link>
                  <Link className="w-full" to="/services">
                    <DashboardCard
                      item={"SERVICES"}
                      data={data.data.service_count}
                    />
                  </Link>
                  <Link className="w-full" to="/reports">
                    <DashboardCard
                      item={"REPORTS"}
                      data={data.data.sale_count}
                    />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
