import Sidebar from "../components/Sidebar";

const UserLayout = ({ children }) => {
  return (
    <>
      <div className=""></div>
      <div className="layout ">
        <Sidebar />
        <div className="main-content ml-56">{children}</div>
      </div>
    </>
  );
};

export default UserLayout;
