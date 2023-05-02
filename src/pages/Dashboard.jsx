// import useAuthContext from "../context/AuthContext";
import DashboardCard from "../components/DashboardCard";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  // const { user } = useAuthContext();

  return (
    <>
      <div className="bg-zinc-200 h-screen">
        <Sidebar />
        <div className=" max-w-5xl mx-auto">
          <h1 className="py-6 text-2xl font-bold">Dashboard</h1>
          {/* <div>{user?.name}</div> */}
          <div className="flex flex-col md:flex-row md:flex-wrap ">
            <DashboardCard item={"EMPLOYEES"} />
            <DashboardCard item={"CUSTOMERS"} />
            <DashboardCard item={"SERVICES"} />
            <DashboardCard item={"REPORTS"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
