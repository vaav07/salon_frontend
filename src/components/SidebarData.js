import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as FcIcons from "react-icons/fc";
import * as IoIcons from "react-icons/io";
import * as CgIcons from "react-icons/cg";

export const SidebarData = [
  {
    title: "DASHBOARD",
    path: "/",
    icon: <MdIcons.MdDashboard />,
    cName: "nav-text",
  },
  {
    title: "CUSTOMER DETAILS",
    path: "/customer",
    icon: <CgIcons.CgDetailsMore />,
    cName: "nav-text",
  },
  {
    title: "EMPLOYEE DETAILS",
    path: "/employee",
    icon: <BiIcons.BiDetail />,
    cName: "nav-text",
  },
  {
    title: "SERVICES DETAILS",
    path: "/services",
    icon: <FaIcons.FaServicestack />,
    cName: "nav-text",
  },
  {
    title: "SALES",
    path: "/sales",
    icon: <FcIcons.FcSalesPerformance />,
    cName: "nav-text",
  },
  {
    title: "REPORTS",
    path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "SETTINGS",
    path: "/settings",
    icon: <AiIcons.AiOutlineSetting />,
    cName: "nav-text",
  },
];
