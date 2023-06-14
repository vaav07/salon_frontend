import AdminSidebar from "../pages/Admin/components/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className=" bg-gray-900"></div>
      <div className="layout ">
        <AdminSidebar />
        <div className="main-content ml-60 mt-4">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
