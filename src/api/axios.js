import axios from "axios";
import { errorConfig } from "./errorConfig";
import { apiToast as toast } from "./APIToast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errors = error.response?.data?.errors;

    if (
      originalRequest.url.includes("/auth/logout") ||
      originalRequest.url.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (err) {
        history.push("/unauthorized");
        return Promise.reject(err);
      }
    }

    if (error.response) {
      console.log("Error interceptor triggered", error.response.status);
      const { status, data } = error.response;

      if (Array.isArray(errors) && errors.length > 0) {
        errors.forEach((e) => {
          toast({
            title: "⚠️ خطأ",
            description: e,
            variant: "destructive",
          });
        });
      } else if (errorConfig.critical.includes(status)) {
        history.push("/server-error");
      } else if (errorConfig.auth.includes(status)) {
        history.push("/unauthorized");
      } else if (errorConfig.simple.includes(status)) {
        toast({
          title: "⚠️ خطأ",
          description: data.message || "حصل خطأ",
          variant: "destructive",
        });
      } else {
        toast({
          title: "⚠️ خطأ",
          description: "حصل خطأ غير متوقع",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "⚠️ خطأ",
        description: "مشكلة في الاتصال بالسيرفر",
        variant: "destructive",
      });
    }

    return Promise.reject(error);
  }
);

export default api;
