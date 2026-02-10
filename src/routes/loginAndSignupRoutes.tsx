import { Route } from "react-router";
import { Navigate } from "react-router";
import AuthLayoutForAuthRoutes from "../pages/AuthLayoutForAuthRoutes";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

export const loginAndSignupRoutes = () => {
  return (
    <>
      <Route index element={<Navigate to="/login" replace />} />
      <Route element={<AuthLayoutForAuthRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  );
};
