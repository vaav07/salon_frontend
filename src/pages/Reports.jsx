import RadioButtons from "../components/RadioButtons";
import ReportList from "../components/ReportList";
// import ReportsList from "../components/ReportsList";
import Sidebar from "../components/Sidebar";

const Reports = () => {
  return (
    <>
      <div className="bg-zinc-200">
        <Sidebar />

        <div className=" max-w-5xl m-auto">
          <h1 className="pt-6 text-2xl font-bold mb-4">Reports</h1>

          {/* <RadioButtons /> */}

          <ReportList />

          {/* <div className="flex flex-col md:flex-row md:flex-wrap ">
            <ReportsList />
            <ReportsList />
            <ReportsList />
            <ReportsList />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Reports;
