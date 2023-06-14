import { useState } from "react";
import useAuthContext from "../context/AuthContext";

// import { Link } from "react-router-dom";
// import useAuthContext from "../context/AuthContext";

const AdminLogin = () => {
  const { adminLogin } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { adminLogin, errors } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    adminLogin({ username, password });
    // console.log(username, password);
  };

  return (
    <>
      <div className="bg-zinc-200 h-screen">
        <div className="w-80 m-auto pt-48">
          <div className="flex justify-center">
            <img
              className="w-48 rounded-md"
              src={
                "https://haztech.in/wp-content/uploads/2020/09/haztechin_logo.png"
              }
              alt="logo"
            />
          </div>
          <h2 className="text-center mt-3 font-bold text-lg">Admin</h2>
          <form onSubmit={handleLogin} className="space-y-5 mt-5">
            <div>
              <input
                className="py-3 px-2 w-full border-b border-black rounded-md"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
              />
              {/* {errors.username && (
                <div>
                  <span>{errors.username[0]}</span>
                </div>
              )} */}
            </div>
            <div>
              <input
                className="py-3 px-2 w-full border-b border-black rounded-md"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {/* {errors.password && (
                <div>
                  <span>{errors.password[0]}</span>
                </div>
              )} */}
            </div>
            <div>
              <button
                className="border border-black w-full py-2 px-2 text-lg rounded-md hover:bg-zinc-700"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
