import { useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "@/components/ui/use-toast";
import { UserContext } from "./AllContext";

export default function UserContextProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const hasSession = localStorage.getItem("hasSession");
      if (!hasSession) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me", { withCredentials: true });
        if (response.data.statusCode === 200) {
          setUserLogin(response.data.data.User);
        } else {
          setUserLogin(null);
          localStorage.removeItem("hasSession");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setUserLogin(null);
          localStorage.removeItem("hasSession");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      const response = await api.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );

      if (response.data.statusCode === 200) {
        toast({
          title: "مع السلامه 👋",
          description: "تم تسجيل الخروج بنجاح",
          variant: "destructive",
        });
        setUserLogin(null);
        localStorage.removeItem("hasSession");
      }
    } finally {
      setUserLogin(null);
      localStorage.removeItem("hasSession");
    }
  };

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}
