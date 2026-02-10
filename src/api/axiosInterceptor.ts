import axios from "axios";
import Cookies from "js-cookie";

const axiosInterceptor = axios.create({
  baseURL: "https://api-fwdslash-staging.cyces.co",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInterceptor.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInterceptor;
