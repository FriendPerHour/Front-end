import React, { useEffect, useState } from "react";
import { waiting as waitingImg } from "@/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "@/api/axios";
import { userAvatar } from "@/assets";
import { Phone, PhoneOff } from "lucide-react";
import { toast } from "../ui/use-toast";

export default function Waiting() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [requestData, setRequestData] = React.useState(null);
  const [waiting, setWaiting] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const requestId = searchParams.get("requestId");

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get(`requests/request/${requestId}`, {
          withCredentials: true,
        });
        setRequestData(res.data.data);

        if (res.data.data.status === "AWAITING_USER_CONFIRMATION") {
          setWaiting(false);
          clearInterval(interval);
        }
      } catch (err) {
        console.error("خطأ في متابعة حالة الطلب", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [requestId, navigate]);

  const handleAccept = async () => {
    setIsAnimating(true);
    try {
      const res = await api.post(
        `requests/confirm-volunteer/${requestId}?confirmed=true`,
        {},
        { withCredentials: true }
      );
      if (res.data.statusCode === 200) {
        toast({
          title: "تم قبول المتطوع ✅",
          description: "جاري تحويلك إلى مكالمة الفيديو... 👋",
          variant: "default",
        });
        navigate(
            `/VideoPage?roomId=${res.data.data.roomId}&requestId=${requestId}`
          );
      }
    } catch (err) {
      console.error("خطأ في قبول المتطوع", err);
    }
  };

  const handleReject = async () => {
    try {
      setIsAnimating(true);
      const res = await api.post(
        `requests/confirm-volunteer/${requestId}?confirmed=false`,
        {},
        { withCredentials: true }
      );
      if (res.data.data.statusCode === 200) {
        setWaiting(true);
        setIsAnimating(false);
      }
    } catch (err) {
      console.error("خطأ في رفض المتطوع", err);
    }
  };

  return (
    <div className="waiting-container rtl mb-6">
      <div className="waiting-card">
        {waiting ? (
          <>
            <div className="relative mb-8 flex justify-center">
              <div className="relative">
                <div className="pulse-ring w-32 h-32 border-2 border-primary/30"></div>
                <div
                  className="pulse-ring w-32 h-32 border-2 border-primary/20"
                  style={{ animationDelay: "1s" }}
                ></div>

                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 p-4 flex items-center justify-center">
                  <img
                    src={waitingImg}
                    alt="انتظار"
                    className="w-full h-full object-contain animate-pulse"
                    style={{
                      animation: "gentle-bounce 3s ease-in-out infinite",
                      filter:
                        "drop-shadow(0 4px 20px hsla(200, 98%, 39%, 0.3))",
                    }}
                  />
                </div>
              </div>
            </div>

            <h1 className="waiting-title mb-4 p-2">من فضلك انتظر رد المتطوع</h1>

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
          </>
        ) : (
          <div className="relative min-h-screen flex items-center justify-center p-6">
            <div className="relative w-full max-w-sm animate-bounce-in">
              <div className="absolute inset-0 bg-call-surface/20 backdrop-blur-xl rounded-3xl"></div>

              <div className="relative bg-call-surface/40 backdrop-blur-xl rounded-3xl p-8 shadow-call border border-white/10">
                <div className="text-center mb-8">
                  <p className="text-call-text-secondary text-sm mb-2 animate-fade-in">
                    طلب مساعدة واردة
                  </p>
                  <h2 className="text-call-text-primary text-lg font-semibold animate-fade-in">
                    تم العثور على متطوع لمساعدتك
                  </h2>
                </div>

                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-call-accept/20 animate-pulse-ring"></div>
                    <div
                      className="absolute inset-0 rounded-full bg-call-accept/20 animate-pulse-ring"
                      style={{ animationDelay: "1s" }}
                    ></div>

                    <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-avatar animate-pulse-avatar">
                      <img
                        src={
                          requestData?.requesterDisabled?.user.avatar ||
                          userAvatar
                        }
                        alt={requestData?.requesterDisabled?.user.userName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center mb-12">
                  <h3 className="text-call-text-primary text-2xl font-bold animate-fade-in">
                    {requestData?.requesterDisabled?.user.userName}
                  </h3>
                  <p className="text-call-text-secondary text-sm mt-2 animate-fade-in">
                    متطوع جاهز للمساعدة
                  </p>
                </div>

                <div className="flex justify-between px-6">
                  <button
                    onClick={handleAccept}
                    disabled={isAnimating}
                    className={`
                group relative w-16 h-16 rounded-full bg-gradient-accept
                shadow-button hover:shadow-lg active:scale-95
                transition-all duration-300 ease-out
                ${isAnimating ? "pointer-events-none opacity-50" : ""}
              `}
                  >
                    <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Phone className="w-7 h-7 text-white m-auto" />
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={isAnimating}
                    className={`
                group relative w-16 h-16 rounded-full bg-gradient-decline
                shadow-button hover:shadow-lg active:scale-95
                transition-all duration-300 ease-out
                ${isAnimating ? "pointer-events-none opacity-50" : ""}
              `}
                  >
                    <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <PhoneOff className="w-7 h-7 text-white m-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
