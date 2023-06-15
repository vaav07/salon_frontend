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

import AdminAuthLayout from "./layouts/AdminAuthLayout";

import LastVisted from "./pages/LastVisited";
import AdminDashboard from "./pages/Admin/pages/AdminDashboard";

import AdminCustomers from "./pages/Admin/pages/AdminCustomers";
import AdminEmployees from "./pages/Admin/pages/AdminEmployees";
import Visits from "./pages/Visits";

import AdminCreateUser from "./pages/Admin/pages/AdminCreateUser";
import AdminServices from "./pages/Admin/pages/AdminServices";
import AdminReports from "./pages/Admin/pages/AdminReports";
import AdminDailyReports from "./pages/Admin/pages/AdminDailyReports";
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
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/employees" element={<AdminEmployees />} />
          {/* <Route path="/admin/reports" element={<AdminReports />} /> */}
          <Route path="/admin/createuser" element={<AdminCreateUser />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/dailyreports" element={<AdminDailyReports />} />
        </Route>

        <Route element={<AuthLayout />}>
          {/* <Sidebar /> */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/customer" element={<CustomerDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/employee" element={<EmployeeDetails />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/lastvisits" element={<LastVisted />} />
          <Route path="/visits" element={<Visits />} />

          {/* <Route path="/settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
