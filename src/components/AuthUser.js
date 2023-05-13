import axios from "axios";

const AuthUser = () => {
  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return { http };
};

export default AuthUser;
