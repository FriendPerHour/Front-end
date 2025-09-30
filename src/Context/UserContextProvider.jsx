import { useState, useEffect, useRef } from "react";
import api, {
  setAccessToken,
  clearAccessToken,
  getAccessToken,
} from "../api/axios";
import { toast } from "@/components/ui/use-toast";
import { UserContext } from "./AllContext";

export default function UserContextProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTimeout = useRef(null);

  const scheduleRefresh = (expiresIn) => {
    if (refreshTimeout.current) clearTimeout(refreshTimeout.current);

    const buffer = 60;
    const timeout = Math.max((expiresIn - buffer) * 1000, 5000);

    refreshTimeout.current = setTimeout(refreshToken, timeout);
  };

  const refreshToken = async () => {
    try {
      const response = await api.post("auth/refresh", {}, { _skipAuth: true });

      if (response.data.statusCode === 200) {
        const { accessToken, expiresIn } = response.data.data.tokens;

        setAccessToken(accessToken, expiresIn);
        scheduleRefresh(expiresIn);


        await fetchUserData();
        return true;
      }
    } catch (error) {

      if (error.response?.status === 401) {
        handleLogout();

        toast({
          title: "انتهت الجلسة",
          description: "يرجى تسجيل الدخول مرة أخرى",
          variant: "destructive",
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
      return false;
    }
  };

  const fetchUserData = async () => {
    try {
      const userResponse = await api.get("auth/me");

      if (userResponse.data.statusCode === 200) {
        const userData =
          userResponse.data.data.User || userResponse.data.data.user;
        setUserLogin(userData);
        return true;
      }
    } catch (error) {

      if (error.response?.status === 401) {

        return await refreshToken();
      }
      return false;
    }
  };

  const handleLogout = () => {
    if (refreshTimeout.current) {
      clearTimeout(refreshTimeout.current);
      refreshTimeout.current = null;
    }
    clearAccessToken();
    setUserLogin(null);
  };

  useEffect(() => {
    async function initializeAuth() {
      const token = getAccessToken();

      if (!token) {
        setLoading(false);
        return;
      }


      try {
        const userDataSuccess = await fetchUserData();

        if (!userDataSuccess) {
          handleLogout();
        }
      } catch {
        handleLogout();
      } finally {
        setLoading(false);
      }
    }

    initializeAuth();

    return () => {
      if (refreshTimeout.current) {
        clearTimeout(refreshTimeout.current);
      }
    };
  }, []);

  const login = async (userData, accessToken, expiresIn = 900) => {
    setUserLogin(userData);
    setAccessToken(accessToken, expiresIn);
    scheduleRefresh(expiresIn);

    toast({
      title: "مرحباً بعودتك! 🎉",
      description: "تم تسجيل الدخول بنجاح",
      variant: "success",
    });
  };

  const logout = async () => {
    try {
      await api.post("auth/logout", {}, { _skipAuth: true });
    } catch {
      console.warn("Logout API call failed");
    } finally {
      handleLogout();
      toast({
        title: "مع السلامه 👋",
        description: "تم تسجيل الخروج بنجاح",
        variant: "success",
      });
    }
  };

  const value = {
    userLogin,
    setUserLogin,
    login,
    logout,
    loading,
    isAuthenticated: !!userLogin && !!getAccessToken(),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
