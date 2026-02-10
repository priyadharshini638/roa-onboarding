import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { authStore } from "../store/authStore";

const AuthLayoutForAuthRoutes = () => {
  const navigate = useNavigate();
  const { setUserData } = authStore();

  useEffect(() => {
    const token = Cookies.get("access_token");
    const user = Cookies.get("user");

    if (!token || !user) {
      navigate("/login", { replace: true });
      return;
    }

    // Sync Zustand state on page refresh
    setUserData(user, token);
  }, [navigate, setUserData]);

  return <Outlet />;
};

export default AuthLayoutForAuthRoutes;
