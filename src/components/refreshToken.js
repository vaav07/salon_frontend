import AuthUser from "./AuthUser";
import mem from "mem";

const { http } = AuthUser();

const refreshTokenFn = async () => {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const response = await http.post("/api/refresh", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { token } = response.data;

    if (!token?.accessToken) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    }

    localStorage.setItem("token", JSON.stringify(token.accessToken));

    return token;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
