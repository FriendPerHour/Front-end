import React, { useEffect } from "react";
import { waiting } from "@/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "@/api/axios";

export default function VolunteerWaiting() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get("requestId");

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get(`requests/request/${requestId}`, {
          withCredentials: true,
        });

        if (res.data.data.status === "ACCEPTED") {
          clearInterval(interval);
          navigate(
            `/VideoPage?roomId=${res.data.data.data.roomId}&requestId=${requestId}`
          );
        }
      } catch (err) {
        console.error("خطأ في متابعة حالة الطلب", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [requestId, navigate]);

  return (
    <div className="waiting-container rtl mb-6">
      <div className="waiting-card">
        <div className="relative mb-8 flex justify-center">
          <div className="relative">
            <div className="pulse-ring w-32 h-32 border-2 border-primary/30"></div>
            <div
              className="pulse-ring w-32 h-32 border-2 border-primary/20"
              style={{ animationDelay: "1s" }}
            ></div>

            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 p-4 flex items-center justify-center">
              <img
                src={waiting}
                alt="انتظار"
                className="w-full h-full object-contain animate-pulse"
                style={{
                  animation: "gentle-bounce 3s ease-in-out infinite",
                  filter: "drop-shadow(0 4px 20px hsla(200, 98%, 39%, 0.3))",
                }}
              />
            </div>
          </div>
        </div>

        <h1 className="waiting-title mb-4 p-2">
          من فضلك انتظر موافقة المستفيد
        </h1>

        <div className="floating-dots">
          <div className="floating-dot"></div>
          <div className="floating-dot"></div>
          <div className="floating-dot"></div>
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-muted/5 border border-border/10">
          <p className="text-sm text-muted-foreground">
            سيتم الرد عليك في أقرب وقت ممكن
          </p>
          <div className="flex items-center justify-center mt-3 gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-xs text-primary font-medium">متصل</span>
          </div>
        </div>
      </div>
    </div>
  );
}
