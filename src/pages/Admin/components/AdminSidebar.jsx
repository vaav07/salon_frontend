import { Link } from "react-router-dom";
import { useState } from "react";
import { IconContext } from "react-icons";

import "./AdminSidebar.scss";

import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as FcIcons from "react-icons/fc";
import * as IoIcons from "react-icons/io";
import * as CgIcons from "react-icons/cg";
import useAuthContext from "../../../context/AuthContext";
// import { SidebarData } from "./SidebarData";

const Sidebar = () => {
  const { adminLogout } = useAuthContext();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            {/* <FaIcons.FaBars onClick={showSidebar} /> */}
          </Link>
        </div>
        <nav className={"nav-menu active"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                {/* <AiIcons.AiOutlineClose /> */}
              </Link>
            </li>

            <li className="">
              <img
                className="logo"
                src={
                  "https://haztech.in/wp-content/uploads/2020/09/haztechin_logo.png"
                }
                alt="logo"
              />
            </li>

            {/* {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })} */}

            <li className="nav-text">
              <Link to="/admin/dashboard">
                <MdIcons.MdDashboard />
                <span>Dashboard</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/admin/createuser">
                <MdIcons.MdDashboard />
                <span>Create user</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/admin/employees">
                <CgIcons.CgDetailsMore />
                <span>Employees</span>
              </Link>
            </li>

            {/* <li className="nav-text">
              <Link to="/admin/customers">
                <BiIcons.BiDetail />
                <span>Customers</span>
              </Link>
            </li> */}

            <li className="nav-text">
              <Link to="/admin/services">
                <FaIcons.FaServicestack />
                <span>Services</span>
              </Link>
            </li>
            {/* <li className="nav-text">
              <Link to="/admin/sales">
                <FcIcons.FcSalesPerformance />
                <span>Sales</span>
              </Link>
            </li> */}
            {/* <li className="nav-text">
              <Link to="/admin/reports">
                <IoIcons.IoIosPaper />
                <span>Reports</span>
              </Link>
            </li> */}
            <li className="nav-text">
              <Link to="/admin/dailyreports">
                <IoIcons.IoIosPaper />
                <span>Daily Reports</span>
              </Link>
            </li>

            {/* <li className="nav-text">
              <Link to="/lastvisits">
                <IoIcons.IoIosPaper />
                <span>Last Visited</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/visits">
                <IoIcons.IoIosPaper />
                <span>Visits</span>
              </Link>
            </li> */}

            <li className="nav-text">
              <button className="logout-btn" onClick={adminLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
