import axios from "axios";

const AuthUser = () => {
  const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,

    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add request interceptor
  http.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  http.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const userType = localStorage.getItem("userRole");
        // Call refresh token method and update token in localStorage
        const newToken = await refreshToken(userType);

        if (newToken) {
          localStorage.setItem("token", newToken);

          // Update the Authorization header with the new token
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          // Retry the original request
          return http(originalRequest);
        }
      }

      return Promise.reject(error);
    }
  );

  const refreshToken = async (userType) => {
    const session = localStorage.getItem("token");

    try {
      let refreshUrl = "";
      if (userType === null) {
        refreshUrl = "/api/refresh"; // Replace with the user refresh route
      } else if (userType === "admin") {
        refreshUrl = "/api/admin/refresh"; // Replace with the admin refresh route
      } else {
        throw new Error("Invalid user type");
      }

      const response = await http.post(refreshUrl, null, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      // console.log("refresh", response.data);
      const { access_token } = response.data;

      if (!access_token) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
      }

      localStorage.setItem("token", JSON.stringify(access_token));

      return access_token;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    }
  };

  return { http };
};

export default AuthUser;
