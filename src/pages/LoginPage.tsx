import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PasswordLogin from "../components/PasswordLogin";
import { authStore } from "../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = authStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-screen-backgrond">
      <div className="absolute inset-0  from-[#821a52] via-[#6b1441] to-[#4a0f2d] opacity-90 "></div>
      <div className="absolute inset-0 bg-white opacity-95 "></div>
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-[596px] px-4">
        <div className="w-full max-w-[430px]">
          <PasswordLogin />
        </div>
      </div>
    </div>
  );
}
