import { create } from "zustand";
import Cookies from "js-cookie";
import axiosInterceptor from "../api/axiosInterceptor";

type AuthState = {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  setUserData: (user: string, token: string) => void;
  logout: () => void;
};

export const authStore = create<AuthState>((set) => {
  const token = Cookies.get("access_token") ?? null;
  const user = Cookies.get("user") ?? null;

  return {
    user,
    token,
    isAuthenticated: Boolean(token),

    login: async (email, password) => {
      try {
        const res = await axiosInterceptor.post("/api/access/login/", {
          email,
          password,
          user_type: "user",
        });

        const accessToken = res?.data?.data?.access_token;

        Cookies.set("access_token", accessToken, { expires: 7 });
        Cookies.set("user", email, { expires: 7 });

        set({
          user: email,
          token: accessToken,
          isAuthenticated: true,
        });

        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
    setUserData: (user, token) => {
      Cookies.set("access_token", token, { expires: 7 });
      Cookies.set("user", user, { expires: 7 });

      set({
        user,
        token,
        isAuthenticated: true,
      });
    },

    logout: () => {
      Cookies.remove("access_token");
      Cookies.remove("user");

      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    },
  };
});
