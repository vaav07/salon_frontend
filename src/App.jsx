import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
// import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import CustomerDetails from "./pages/CustomerDetails";
import EmployeeDetails from "./pages/EmployeeDetails";
import Reports from "./pages/Reports";
import Sales from "./pages/Sales";
import Services from "./pages/Services";
import Settings from "./pages/Settings";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <>
      {/* <Login /> */}
      {/* <Sidebar /> */}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/customer" element={<CustomerDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/employee" element={<EmployeeDetails />} />

        <Route element={<AuthLayout />}>
          {/* <Sidebar /> */}

          <Route path="/sales" element={<Sales />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
