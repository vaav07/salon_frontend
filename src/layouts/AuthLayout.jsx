import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
// import { useEffect, useState } from "react";

const AuthLayout = () => {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthLayout;

// const [user, setUser] = useState({});
// ...

// function RequireAuth({ children, redirectTo }) {
//   const { user, setUser } = useContext(UserContext);

//   if (user.LoggedInStatus === undefined) {
//     return null; // or loading indicator, etc...
//   }

//   return user.LoggedInStatus === "LoggedIn"
//     ? children
//     : <Navigate to={redirectTo} replace />;
// }
