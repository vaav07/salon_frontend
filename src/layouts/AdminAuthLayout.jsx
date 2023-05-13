import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
const AdminAuthLayout = () => {
  const { admin } = useAuthContext();
  return admin ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminAuthLayout;
