import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "../components/AuthUser";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { http } = AuthUser();

  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [admin, setAdmin] = useState(sessionStorage.getItem("admin"));
  const [adminId, setAdminId] = useState(sessionStorage.getItem("adminId"));
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //to get the user details
  const getUser = async () => {
    try {
      const response = await http.post("/api/me", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.name);
      setUserId(response.data.id);
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
      setAdminId(response.data.id);
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
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(JSON.stringify(response.data.user));

      sessionStorage.setItem("userId", response.data.user.id);
      setUserId(response.data.user.id);
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
      sessionStorage.setItem("admin", JSON.stringify(response.data.user));
      setAdmin(JSON.stringify(response.data.user));
      sessionStorage.setItem("adminId", response.data.user.id);
      setAdminId(response.data.user.id);
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
      sessionStorage.removeItem("userId");
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
      sessionStorage.removeItem("adminId");
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
        config,
        http,
        user,
        userId,
        admin,
        adminId,
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
