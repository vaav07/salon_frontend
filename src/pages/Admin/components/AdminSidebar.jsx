import logo from "../../../../src/assets/Deadpool.webp";

const AdminSidebar = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white w-full">
      {/* Logo */}
      <div className="p-4">
        <img src={logo} alt="Logo" className="w-20 h-20" />
      </div>

      {/* Sidebar Content */}
      <div className="flex-grow">
        <ul className="flex flex-col py-4">
          <li className="px-4 py-2">
            <a href="/" className="text-white">
              <span className="text-gray-400">Stats</span>
            </a>
          </li>
          <li className="px-4 py-2">
            <a href="/" className="text-white">
              <span className="text-gray-400">Employee</span>
            </a>
          </li>
          <li className="px-4 py-2">
            <a href="/" className="text-white">
              <span className="text-gray-400">Services</span>
            </a>
          </li>
          <li className="px-4 py-2">
            <a href="/" className="text-white">
              <span className="text-gray-400">Customers</span>
            </a>
          </li>
          <li className="px-4 py-2">
            <a href="/" className="text-white">
              <span className="text-gray-400">Reports</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button className="px-4 py-2 bg-red-500 rounded-lg text-white">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
