import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useVoice } from "../../Context/AllContext";

export default function Layout() {
  const navigate = useNavigate();
  const { setNavigate, setLocation, speakResponse, currentLang } = useVoice();
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    setNavigate(() => navigate);
  }, [navigate, setNavigate]);

  useEffect(() => {
    setLocation(location);
  }, [location, setLocation]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    setIsPageLoading(true);

    speakResponse(
      currentLang === "ar-EG"
        ? "جار التحميل، برجاء الانتظار"
        : "Loading, please wait"
    );

    const loadingTimer = setTimeout(() => {
      setIsPageLoading(false);
      speakResponse(
        currentLang === "ar-EG" ? "تم تحميل الصفحة" : "Page loaded"
      );
    }, 2000);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [location.pathname, speakResponse, currentLang]);

  if (isPageLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-white text-xl font-medium text-center">
            {currentLang === "ar-EG" ? "جار التحميل..." : "Loading..."}
          </p>
          {!isOnline && (
            <p className="text-yellow-300 text-sm mt-3 text-center">
              {currentLang === "ar-EG"
                ? "لا يوجد اتصال بالإنترنت"
                : "No internet connection"}
            </p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow  flex items-center justify-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
