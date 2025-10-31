import axios from "axios";
import { toast } from "react-toastify";
import { refreshUser } from "../services/authentication";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosBaseInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // This allows cookies to be sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBaseInstance.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      // ❌ Don't force JSON here
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosBaseInstance.interceptors.response.use(
  (response) => {
    // console.log("📥 Response:", response.status, response.config.url);
    // console.log("Response data from interceptors:", response.data);
    return response;
  },
  async (error) => {
    console.error("❌ API Error:", error);
    const originalRequest = error.config;
    // optional: handle 401 Unauthorized
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refreshUser();
        return axiosBaseInstance(originalRequest);
      } catch (error) {
        console.log({ error });
        toast.warn("🚨 Unauthorized. Redirecting to login...");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosBaseInstance;
