import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex">
        <div className="w-52">
          <AdminSidebar />
        </div>
        <div>AdminDashboard</div>
      </div>
    </>
  );
};

export default AdminDashboard;
