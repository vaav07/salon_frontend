import ReportsList from "../components/ReportsList";
import Sidebar from "../components/Sidebar";

const Reports = () => {
  return (
    <>
      <div className="bg-zinc-200">
        <Sidebar />

        <div className=" max-w-5xl m-auto">
          <h1 className="py-6 text-2xl font-bold">Reports</h1>
          <div className="flex flex-col md:flex-row md:flex-wrap ">
            <ReportsList />
            <ReportsList />
            <ReportsList />
            <ReportsList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
