import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { useState } from "react";
import { IconContext } from "react-icons";

import "./Sidebar.scss";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as FcIcons from "react-icons/fc";
import * as IoIcons from "react-icons/io";
import * as CgIcons from "react-icons/cg";
// import { SidebarData } from "./SidebarData";

const Sidebar = () => {
  const { logout } = useAuthContext();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            <li className="">
              <img
                className="logo"
                src={
                  "https://img.etimg.com/thumb/msid-69724545,width-650,height-488,imgsize-1032582,,resizemode-75/hugh-jackman-holds-a-guinness-world-record-for-longest-career-as-a-live-action-marvel-superhero-for-his-role-as-wolverine-.jpg"
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
              <Link to="/">
                <MdIcons.MdDashboard />
                <span>Dashboard</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/customer">
                <CgIcons.CgDetailsMore />
                <span>Customers</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/employee">
                <BiIcons.BiDetail />
                <span>Employees</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/services">
                <FaIcons.FaServicestack />
                <span>Services</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/sales">
                <FcIcons.FcSalesPerformance />
                <span>Sales</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/reports">
                <IoIcons.IoIosPaper />
                <span>Reports</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/settings">
                <AiIcons.AiOutlineSetting />
                <span>Settings</span>
              </Link>
            </li>

            <li className="nav-text">
              <button className="logout-btn" onClick={logout}>
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
