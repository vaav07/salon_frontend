import useAuthContext from "../context/AuthContext";
import DashboardCard from "../components/DashboardCard";
import Sidebar from "../components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import UserLayout from "../layouts/UserLayout";

const Dashboard = () => {
  const { http, user, userId, config } = useAuthContext();

  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => await http.get(`/api/statistics/${userId}`, config),
  });

  return (
    <UserLayout>
      {user && (
        <div className="">
          <div className=" max-w-5xl mx-auto">
            <h1 className="py-4 text-2xl font-bold">Dashboard</h1>
            {/* <div>{user?.name}</div> */}

            {isLoading ? (
              <h3>Loading...</h3>
            ) : (
              <div>
                <div className="grid grid-cols-4 gap-4">
                  <Card
                    name={"TODAY'S SALES"}
                    data={data.data.todaysOverallSalesAmount}
                  />
                  <Card
                    name={"CASH AMOUNT"}
                    data={data.data.todaysCashSalesAmount}
                  />
                  <Card
                    name={"UPI AMOUNT"}
                    data={data.data.todaysUpiSalesAmount}
                  />
                  <Card
                    name={"CARD AMOUNT"}
                    data={data.data.todaysCardSalesAmount}
                  />

                  {data.data.employeeSalesAmounts.map((item) => (
                    <Card
                      key={item.employee_name}
                      name={item.employee_name}
                      data={item.salesAmount}
                    />
                  ))}
                </div>
                {/* <div className="grid md:grid-cols-2 mt-2 ml-[-14px] ">
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
                </div> */}
              </div>
            )}
          </div>
        </div>
      )}
    </UserLayout>
  );
};

export default Dashboard;
