import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "../components/AuthUser";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { http } = AuthUser();

  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const [admin, setAdmin] = useState(sessionStorage.getItem("admin"));
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  //to get the user details
  const getUser = async () => {
    try {
      const response = await http.post("/api/me", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.name);
      // console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  //to get the admin details
  const getAdmin = async () => {
    try {
      const response = await http.post("/api/admin/me", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmin(response.data.name);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async ({ ...data }) => {
    try {
      const response = await http.post("/api/login", data, {
        "Cache-Control": "no-cache",
      });
      const token = response.data.access_token;
      sessionStorage.setItem("token", token);
      setToken(token);
      sessionStorage.setItem("user", response.data.user.name);
      setUser(response.data.user.name);
      navigate("/");
    } catch (e) {
      //need to fix this
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  //admin login
  const adminLogin = async ({ ...data }) => {
    try {
      const response = await http.post("/api/admin/login", data, {
        "Cache-Control": "no-cache",
      });
      const token = response.data.access_token;
      sessionStorage.setItem("token", token);
      setToken(token);
      setAdmin(response.data.user.name);
      sessionStorage.setItem("admin", response.data.user.name);
      setAdmin(response.data.user.name);
      navigate("/adminDash");
    } catch (e) {
      //need to fix this
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const logout = () => {
    try {
      http.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      navigate("/login");
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const adminLogout = () => {
    try {
      http.post("/api/admin/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("admin");
      navigate("/admin");
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   if (!user) {
  //     getUser();
  //   }
  // }, []);

  return (
    <AuthContext.Provider
      // value={value}
      value={{
        user,
        admin,
        errors,
        token,
        setToken,
        getUser,
        getAdmin,
        login,
        logout,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
