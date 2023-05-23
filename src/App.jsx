import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
// import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import CustomerDetails from "./pages/CustomerDetails";
import EmployeeDetails from "./pages/EmployeeDetails";
import Reports from "./pages/Reports";
import Sales from "./pages/Sales";
import Services from "./pages/Services";
// import Settings from "./pages/Settings";
import AuthLayout from "./layouts/AuthLayout";
import AdminPage from "./pages/Admin/AdminPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminAuthLayout from "./layouts/AdminAuthLayout";
// import PraticeComp from "./components/PraticeComp";

function App() {
  return (
    <>
      {/* <Login /> */}
      {/* <Sidebar /> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Admin Login */}
        <Route path="/admin" element={<AdminPage />} />
        {/* <Route path="/pratice" element={<PraticeComp />} /> */}

        {/* Admin Routes */}
        <Route element={<AdminAuthLayout />}>
          <Route path="/adminDash" element={<AdminDashboard />} />
        </Route>

        <Route element={<AuthLayout />}>
          {/* <Sidebar /> */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/customer" element={<CustomerDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/employee" element={<EmployeeDetails />} />
          <Route path="/sales" element={<Sales />} />

          {/* <Route path="/settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
