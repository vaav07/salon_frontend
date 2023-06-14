import ReportList from "../components/ReportList";
// import ReportsList from "../components/ReportsList";
import UserLayout from "../layouts/UserLayout";

const Reports = () => {
  return (
    <UserLayout>
      <div className="bg-zinc-200">
        {/* <Sidebar /> */}

        <div className=" max-w-5xl m-auto">
          <h1 className="pt-5 text-2xl font-bold mb-3">Reports</h1>

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
    </UserLayout>
  );
};

export default Reports;
