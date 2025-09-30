import axios from "axios";
import { toast } from "../components/ui/use-toast";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const getAccessToken = () => {
  try {
    return getCookie("accessToken");
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

export const setAccessToken = (token, expiresIn = 900) => {
  try {
    if (token) {
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + expiresIn);
      setCookie("accessToken", token, expires);
    }
  } catch (error) {
    console.error("Error setting access token:", error);
  }
};

export const clearAccessToken = () => {
  try {
    deleteCookie("accessToken");
  } catch (error) {
    console.error("Error clearing access token:", error);
  }
};

// Cookie utility functions
const setCookie = (name, value, expires, path = "/") => {
  let cookie = `${name}=${encodeURIComponent(value)};`;
  cookie += `path=${path};`;

  if (expires) {
    cookie += `expires=${expires.toUTCString()};`;
  }

  if (import.meta.env.PROD) {
    cookie += "SameSite=Strict;";
  }

  document.cookie = cookie;
};

const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

const deleteCookie = (name, path = "/") => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path};`;
};

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && !config._skipAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?._skipAuth) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}auth/refresh`,
          {},
          {
            withCredentials: true,
            timeout: 30000,
            _skipAuth: true,
          }
        );

        if (refreshResponse.data.statusCode === 200) {
          const newAccessToken = refreshResponse.data.data.tokens.accessToken;
          const expiresIn = refreshResponse.data.data.tokens.expiresIn;

          setAccessToken(newAccessToken, expiresIn);

          // Update the original request header
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Process queued requests
          processQueue(null, newAccessToken);

          // Retry the original request
          return api(originalRequest);
        } else {
          throw new Error("Refresh failed with non-200 status");
        }
      } catch (refreshError) {
        // Process queued requests with error
        processQueue(refreshError, null);

        // Clear tokens and redirect to login
        clearAccessToken();

        // Show error message
        if (refreshError.response?.status === 401) {
          toast({
            title: "انتهت الجلسة",
            description: "يرجى تسجيل الدخول مرة أخرى",
            variant: "destructive",
          });

          // Redirect to login page after a short delay
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other API errors (don't show toast for 401)
    if (error.response?.status !== 401) {
      const errorMessage = error.response?.data?.message || "حصل خطأ غير متوقع";

      // Don't show toast for network errors or cancellations
      if (error.code !== "ERR_NETWORK" && error.code !== "ERR_CANCELED") {
        toast({
          title: "⚠️ خطأ",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
