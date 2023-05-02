import { useState } from "react";

// import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, errors } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    login({ email, password });
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
                "https://img.etimg.com/thumb/msid-69724545,width-650,height-488,imgsize-1032582,,resizemode-75/hugh-jackman-holds-a-guinness-world-record-for-longest-career-as-a-live-action-marvel-superhero-for-his-role-as-wolverine-.jpg"
              }
              alt="logo"
            />
          </div>
          <form onSubmit={handleLogin} className="space-y-5 mt-10">
            <div>
              <input
                className="py-3 px-2 w-full border-b border-black rounded-md"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              {errors.email && (
                <div>
                  <span>{errors.email[0]}</span>
                </div>
              )}
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
              {errors.password && (
                <div>
                  <span>{errors.password[0]}</span>
                </div>
              )}
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

export default Login;
