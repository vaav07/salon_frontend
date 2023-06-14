import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "../components/AuthUser";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { http } = AuthUser();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [admin, setAdmin] = useState(localStorage.getItem("admin"));
  const [adminId, setAdminId] = useState(localStorage.getItem("adminId"));
  const [errors, setErrors] = useState([]);

  const [selectedResult, setSelectedResult] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

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

      //       const loginEndpoint = "/api/login"; // Replace with the actual login endpoint used
      // const userType = loginEndpoint.includes("user") ? "user" : "admin";
      localStorage.setItem("userType", user);

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(JSON.stringify(response.data.user));

      localStorage.setItem("userId", response.data.user.id);
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
      localStorage.setItem("token", token);
      setToken(token);
      localStorage.setItem("admin", JSON.stringify(response.data.user));
      setAdmin(JSON.stringify(response.data.user));
      localStorage.setItem("adminId", response.data.user.id);
      setAdminId(response.data.user.id);
      const loginEndpoint = "/api/admin/login"; // Replace with the actual login endpoint used
      const userType = loginEndpoint.includes("user") ? "user" : "admin";
      localStorage.setItem("userType", userType);
      navigate("/admin/dashboard");
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

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
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

      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      localStorage.removeItem("adminId");
      localStorage.removeItem("userType");
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
        selectedResult,
        setSelectedResult,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
