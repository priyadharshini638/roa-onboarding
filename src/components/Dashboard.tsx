import { useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore";
import Cookies from "js-cookie";

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = authStore((s) => s.logout);

  const clearAllCookies = () => {
    Cookies.remove("user");
    Cookies.remove("isAuthenticated");
    Cookies.remove("access_token");
  };

  const handleLogout = () => {
    if (logout) logout();
    clearAllCookies();
    navigate("/login", { replace: true });
  };

  return (
    <div className="p-6 text-xl">
      <div className="mb-4">Welcome to Dashboard</div>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-3 py-2 rounded"
        type="button"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
